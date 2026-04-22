export interface EmiObligation {
  lender: string;
  monthly_emi: number;
  type: string;
}

export interface RedFlag {
  flag: string;
  severity: "High" | "Medium" | "Low";
  detail: string;
}

export interface CreditAssessment {
  applicant_name: string;
  period: string;
  income: {
    primary_source: string;
    monthly_salary: number;
    salary_date_consistency: string;
    secondary_income: string | null;
    secondary_avg_monthly: number;
    total_monthly_income: number;
    stability: string;
  };
  emi_load: {
    obligations: EmiObligation[];
    total_monthly_emi: number;
    emi_to_income_ratio: number;
    credit_card_trend: string;
  };
  red_flags: RedFlag[];
  cash_flow: {
    avg_end_of_month_balance: number;
    balance_trajectory: string;
    months_with_negative_balance: number;
    surplus_after_obligations: number;
  };
  risk_tier: {
    tier: "Green" | "Amber" | "Red";
    confidence: number;
    rationale: string;
  };
  recommendation: string;
}
