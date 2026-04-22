import OpenAI from "openai";

let _client: OpenAI | null = null;
function getClient() {
  if (!_client) _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _client;
}

// NOTE: OpenAI requires the word "JSON" in the system prompt when using
// response_format: { type: "json_object" }. Do not remove the JSON instruction.
const SYSTEM_PROMPT = `You are Apollo Finvest's Bank Statement Intelligence engine. You analyze Indian bank statements and output structured credit assessments for underwriting decisions.

ANALYSIS FRAMEWORK:

1. INCOME ANALYSIS
- Identify primary income source (salary credit, business income)
- Check salary date consistency across months (e.g., always 1st-3rd = "Consistent", varies by 5+ days = "Irregular")
- Identify secondary income (freelance, rental, etc.)
- Classify stability: "Stable" (consistent salary, minimal variance), "Mixed" (salary stable but secondary income irregular), "Unstable" (irregular primary income)

2. EMI LOAD DETECTION
- Find ALL recurring monthly debits with "EMI", "LOAN", or consistent same-amount debits to financial institutions
- Calculate EMI-to-income ratio (total EMIs / total monthly income)
- Track credit card payment trajectory across months

3. RED FLAG DETECTION (be thorough)
- Gambling/betting: Dream11, My11Circle, MPL, WinZO, RummyCircle, any fantasy sports or betting platform
- Cheque bounces or "INSUFFICIENT FUNDS" entries
- Negative balance instances
- Peer-to-peer borrowing: credits from individuals with "LOAN" in description
- Salary advances from employer
- High-frequency cash withdrawals (ATM > 3x per month)

4. CASH FLOW ANALYSIS
- Calculate end-of-month balance for each month
- Determine trajectory: "Declining", "Improving", or "Volatile"

5. RISK TIER ASSIGNMENT
- GREEN: EMI-to-income < 40%, no high-severity red flags, no negative balance months
- AMBER: EMI-to-income 40-55%, OR 1-2 medium red flags, OR volatile trajectory
- RED: EMI-to-income > 55%, OR any high-severity red flag, OR multiple compounding flags

Respond ONLY with valid JSON. No markdown backticks. No preamble. No explanation outside the JSON.

{
  "applicant_name": "string",
  "period": "string",
  "income": {
    "primary_source": "string",
    "monthly_salary": number,
    "salary_date_consistency": "string",
    "secondary_income": "string or null",
    "secondary_avg_monthly": number,
    "total_monthly_income": number,
    "stability": "Stable|Unstable|Mixed"
  },
  "emi_load": {
    "obligations": [{"lender": "string", "monthly_emi": number, "type": "string"}],
    "total_monthly_emi": number,
    "emi_to_income_ratio": number,
    "credit_card_trend": "string"
  },
  "red_flags": [{"flag": "string", "severity": "High|Medium|Low", "detail": "string"}],
  "cash_flow": {
    "avg_end_of_month_balance": number,
    "balance_trajectory": "Improving|Declining|Volatile",
    "months_with_negative_balance": number,
    "surplus_after_obligations": number
  },
  "risk_tier": {
    "tier": "Green|Amber|Red",
    "confidence": number,
    "rationale": "string (1 sentence, max 80 chars)"
  },
  "recommendation": "string (2-3 sentences)"
}`;

// Clean and truncate PDF-extracted text before sending to OpenAI.
// PDF extraction produces repeated headers, excessive whitespace, and page markers
// that inflate token count without adding signal. Cap at 24,000 chars (~6000 tokens),
// which is enough to cover a 6-month bank statement.
function prepareStatement(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]{3,}/g, "  ")       // collapse wide whitespace runs
    .replace(/\n{4,}/g, "\n\n\n")      // collapse long blank stretches
    .trim()
    .slice(0, 24000);
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OpenAI API key not configured. Add OPENAI_API_KEY to .env.local." },
      { status: 500 }
    );
  }

  let statement: string;
  try {
    const body = await req.json();
    statement = body.statement ?? "";
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const prepared = prepareStatement(statement);

  if (prepared.length < 100) {
    return Response.json(
      { error: "Statement too short. Paste a full bank statement (or upload a valid PDF)." },
      { status: 400 }
    );
  }

  let rawJson = "";
  try {
    const completion = await getClient().chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1500,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Analyze this Indian bank statement and output the credit assessment JSON:\n\n${prepared}` },
      ],
      response_format: { type: "json_object" },
    });
    rawJson = completion.choices[0]?.message?.content ?? "";
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("OpenAI call failed:", msg);

    if (msg.includes("context_length_exceeded") || msg.includes("maximum context length")) {
      return Response.json(
        { error: "Statement is too large for analysis. Try uploading just the last 3 months." },
        { status: 400 }
      );
    }
    if (msg.includes("invalid_api_key") || msg.includes("Incorrect API key")) {
      return Response.json(
        { error: "Invalid OpenAI API key. Check OPENAI_API_KEY in .env.local." },
        { status: 500 }
      );
    }
    return Response.json({ error: "OpenAI request failed. Please try again." }, { status: 500 });
  }

  try {
    return Response.json(JSON.parse(rawJson));
  } catch {
    console.error("OpenAI returned invalid JSON:", rawJson.slice(0, 200));
    return Response.json(
      { error: "Model returned malformed output. Please try again." },
      { status: 500 }
    );
  }
}
