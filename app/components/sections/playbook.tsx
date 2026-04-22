"use client";

import { motion } from "framer-motion";
import { BucketHeader } from "@/app/components/playbook/bucket-header";
import { IdeaCard } from "@/app/components/playbook/idea-card";
import { SummaryTable } from "@/app/components/playbook/summary-table";
import { HypothesisTable } from "@/app/components/playbook/hypothesis-table";
import { fadeUp } from "@/lib/animations";

const viewport = { once: true, margin: "-80px" };

const BUCKETS = [
  {
    number: "1",
    title: "Apollo Cash Intelligence",
    description:
      "Apollo Cash is growing at 200% quarter over quarter. Every underwriting gap that is not closed with AI becomes a GNPA problem at scale. These two ideas protect the moat that Apollo is most proud of.",
    ideas: [
      {
        number: "01",
        title: "Bank Statement Intelligence",
        flowLine:
          "Bank Statement PDF -> Transaction Parse -> Signal Extraction -> Risk Tier (Green/Amber/Red) -> Supplements Bureau Score",
        logic:
          "Bureau API gives a CIBIL score, which is a lagging indicator of past behavior. For Apollo Cash's sub Rs 2L segment, many borrowers are thin-file. Bank statements surface current financial reality: salary regularity, existing EMI load, gambling merchant patterns, end-of-month balance behavior. This is the contextual signal the bureau score structurally cannot provide. The JD calls this out verbatim.",
        ifItFails:
          "Bank statement quality varies. Some borrowers submit secondary accounts or have irregular income cycles. If the model adds noise on thin-file users, shift to UPI transaction frequency and app behavior as alternate inputs. Build a confidence score so the agent flags low-confidence assessments rather than outputs bad tiers.",
        kpiChips: ["Default rate -15 to 25%", "Underwriting throughput - no manual bottleneck", "Direct Credit Loss impact"],
        demoLink: true,
      },
      {
        number: "02",
        title: "Pre-Delinquency Early Warning",
        flowLine:
          "Repayment Timing Data -> Behavioral Drift Detection -> 7-Day Risk Score per Account -> Proactive Nudge Before Default",
        logic:
          "Apollo's GNPA of 1.2% is a front-loaded bet. It comes from who they lend to, not from catching deterioration mid-cycle. As Apollo Cash scales 3x to 5x, maintaining this number requires earlier intervention. Payment timing drift (Day 5 to Day 25 to Day 29), failed auto-debit attempts, and partial payment patterns are 7 to 14 day leading indicators. This turns collection from reactive to preventive.",
        ifItFails:
          "Not all late payments predict default. Some borrowers consistently pay on day 29. Build per-borrower baselines before flagging. If proactive nudges increase friction, A/B test nudge frequency and channel mix. If signals are too sparse on a young book, widen to include bank balance data at payment date.",
        kpiChips: ["7-14 day early warning", "False positive rate below 20%", "GNPA held below 1.5% at 5x AUM"],
      },
    ],
  },
  {
    number: "2",
    title: "Partner Intelligence",
    description:
      "Apollo's own words: we benchmark every partner against the rest of the ecosystem. Today this is manual. Sonic has live cross-partner data that no individual fintech can see. The gap is what sits on top of it.",
    ideas: [
      {
        number: "03",
        title: "Partner Portfolio Health Monitor",
        flowLine:
          "Sonic Live Feed -> Nightly Scan per Partner -> Anomaly Detection -> Morning Brief for Leadership",
        logic:
          "When leadership reviews partner performance today, they look at a dashboard, which means someone still interprets, compares, and decides. A nightly intelligence layer that auto-flags 'Partner X: GNPA up 40bps this month, now 1.8x portfolio average' converts raw data into a decision-ready brief. This is real-time, AI-summarized insights for leadership - the exact language in the JD.",
        ifItFails:
          "Too many alerts create dashboard fatigue. Start with 3 metrics only: GNPA week-over-week trend, partner concentration ratio (partner AUM divided by total AUM), and disbursement velocity spike. Calibrate thresholds on historical data before going live. If the team stops acting on alerts, the signal definition is wrong, not the idea.",
        kpiChips: ["Anomaly detection under 24 hours", "Zero concentration surprises", "Signal-to-noise above 80%"],
      },
      {
        number: "04",
        title: "Partner Intake Agent",
        flowLine:
          "New Fintech Inquiry -> Public Data Pull -> Benchmark vs Existing Cohort -> Structured Pre-Diligence Brief",
        logic:
          "Apollo's diligence is deep by design. Meaningful capital commitment, deep model understanding. But the pre-diligence research (regulatory filings, portfolio quality signals, founder background, benchmark vs current partner cohort) is currently manual prep work. An intake agent compresses this from days to hours without changing the quality of judgment that follows. The moat is the curation decision, not the time it takes to prepare for it.",
        ifItFails:
          "Public data on early-stage fintechs is sparse. If the agent cannot find enough signal, it should say so explicitly rather than generating thin profiles. Build a data confidence flag. If intake briefs do not reduce decision time, the output format needs rethinking, not the underlying logic.",
        kpiChips: ["Intake brief under 30 minutes", "vs 2-3 day manual prep today", "Data confidence flag on every brief"],
      },
    ],
  },
  {
    number: "3",
    title: "Operations Automation",
    description:
      "Senti proved that AI applied to Apollo's operations creates measurable savings. These two ideas are the natural next steps on work already started.",
    ideas: [
      {
        number: "05",
        title: "Regulatory Reporting Agent",
        flowLine:
          "Sonic + Reconciliation Data -> Period-End Pull -> RBI Template Mapping -> Discrepancy Flags -> Draft for Sign-Off",
        logic:
          "As a BSE-listed NBFC, Apollo files with RBI under digital lending guidelines, submits quarterly financials, and manages SEBI disclosures. The Company Secretary and Legal Head was hired as recently as August 2025. This is one person managing regulatory obligations across all entities. The bottleneck is data assembly, not judgment. An agent that pulls from Sonic and reconciliation systems, maps to prescribed formats, and flags anomalies turns their job from assembly to review and signature.",
        ifItFails:
          "RBI has updated digital lending guidelines twice in three years. If the template mapping layer is hardcoded, it breaks with every format change. Build it as a configurable layer. If the agent introduces errors worse than manual, add a mandatory reconciliation step before submission. The point is to reduce effort, not remove oversight.",
        kpiChips: ["Report prep time -80%", "Zero discrepancy-triggered RBI queries", "Scales to 3x partners without new headcount"],
      },
      {
        number: "06",
        title: "Senti v2 - From Monitoring to Optimization",
        flowLine:
          "Senti v1 Scores + Repayment History + Borrower Profile -> Pre-Call Optimization -> Prioritized Daily Call List",
        logic:
          "Senti v1 answers: was that call good or bad, after it happens. Senti v2 answers: which accounts to call, when, and how, before it happens. The data for this already exists inside Senti. Historical answer rates, past sentiment scores per borrower, correlation between tone and payment outcome. This is not a new model. It is the intelligent next layer on top of what Apollo has already built and proven.",
        ifItFails:
          "Historical call data may be insufficient to predict per-borrower behavior on a young book. Start with cohort-level optimization (call segments with similar repayment profiles at similar times) before per-borrower personalization. If collection success rate does not improve in 60 days, the input features need rethinking before the model does.",
        kpiChips: ["Collection success rate +20%", "Ops planning time -50%", "Builds on existing Senti dataset"],
      },
    ],
  },
];

export function PlaybookSection() {
  return (
    <section id="playbook" className="py-24">
      <div className="max-w-3xl mx-auto w-full px-6 md:px-10 space-y-16">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <p className="text-[11px] uppercase tracking-widest font-medium mb-3" style={{ color: "#1D9E75" }}>
            THE AI PLAYBOOK
          </p>
          <motion.div
            className="h-0.5 mb-4 rounded-full"
            style={{ background: "#1D9E75", width: 0 }}
            whileInView={{ width: 32 }}
            viewport={viewport}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <h2 className="text-[28px] font-medium leading-snug text-[#09090B]" style={{ letterSpacing: "-0.02em" }}>
            6 ideas. 3 buckets. Each mapped to a lever.
          </h2>
          <p className="text-[14px] mt-3 max-w-xl leading-relaxed" style={{ color: "#52525B" }}>
            Every idea below targets a process Apollo currently does manually and has outgrown. The logic
            column is the hypothesis. The &apos;if it fails&apos; column is the pivot. This is not a feature
            list. It is a set of bets.
          </p>
        </motion.div>

        {/* Summary table */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <SummaryTable />
        </motion.div>

        {/* Buckets */}
        {BUCKETS.map((bucket) => (
          <div key={bucket.number} className="space-y-5">
            <BucketHeader
              number={bucket.number}
              title={bucket.title}
              description={bucket.description}
            />
            {bucket.ideas.map((idea) => (
              <IdeaCard key={idea.number} {...idea} />
            ))}
          </div>
        ))}

        {/* Hypothesis table */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <HypothesisTable />
        </motion.div>

      </div>
    </section>
  );
}
