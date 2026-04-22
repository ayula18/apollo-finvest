"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RiskBadge } from "./risk-badge";
import { MetricCard } from "./metric-card";
import { EmiTable } from "./emi-table";
import { RedFlagRow } from "./red-flag-row";
import { formatINR, formatPercent, truncate } from "@/lib/format";
import { fadeUp, staggerFast } from "@/lib/animations";
import type { CreditAssessment as Assessment } from "@/lib/types";

const tierBorderColor: Record<string, string> = {
  Green: "#16A34A", Amber: "#D97706", Red: "#DC2626",
};

export function CreditAssessment({ data, rawStatement, onReset }: { data: Assessment; rawStatement: string; onReset: () => void }) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `apollo-assessment-${data.applicant_name.replace(/\s+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const rationale = data.risk_tier.rationale;
  const rationaleNeedsTooltip = rationale.length > 60;

  return (
    <Tabs defaultValue="assessment">
      <TabsList className="mb-4" style={{ background: "#F4F4F5" }}>
        <TabsTrigger value="assessment">Credit assessment</TabsTrigger>
        <TabsTrigger value="raw">Raw statement</TabsTrigger>
      </TabsList>

      <TabsContent value="raw">
        <pre className="statement-textarea rounded-xl p-4 border overflow-x-auto whitespace-pre-wrap"
          style={{ background: "#F4F4F5", borderColor: "#E4E4E7", color: "#71717A" }}>
          {rawStatement}
        </pre>
      </TabsContent>

      <TabsContent value="assessment" className="space-y-6">

        {/* Section A: Summary bar */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="flex items-start justify-between gap-4 flex-wrap"
        >
          <motion.div variants={fadeUp}>
            <p className="text-[16px] font-medium text-[#09090B]">{data.applicant_name}</p>
            <p className="text-[12px] mt-0.5" style={{ color: "#52525B" }}>{data.period}</p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col items-end gap-2">
            {/* Risk badge with entrance scale */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            >
              <RiskBadge tier={data.risk_tier.tier} />
            </motion.div>
            {/* Confidence progress bar — teal fill */}
            <div className="flex items-center gap-2 w-48">
              <Progress
                value={data.risk_tier.confidence}
                className="h-1.5 flex-1"
                style={{ "--progress-foreground": "#1D9E75" } as React.CSSProperties}
              />
              <span className="text-[12px] shrink-0" style={{ color: "#52525B" }}>
                {data.risk_tier.confidence}% conf.
              </span>
            </div>
            {/* Rationale — tooltip if > 60 chars */}
            {rationaleNeedsTooltip ? (
              <Tooltip>
                <TooltipTrigger className="text-[12px] cursor-default bg-transparent border-0 p-0 text-right" style={{ color: "#52525B" }}>
                  {truncate(rationale, 60)}
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs text-[12px]">{rationale}</TooltipContent>
              </Tooltip>
            ) : (
              <span className="text-[12px] text-right" style={{ color: "#52525B" }}>{rationale}</span>
            )}
          </motion.div>
        </motion.div>

        <Separator style={{ borderColor: "#E4E4E7" }} />

        {/* Section B: Metric cards with stagger entrance */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          variants={staggerFast}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: "Monthly income", value: formatINR(data.income.total_monthly_income), subtitle: data.income.stability },
            { label: "EMI load", value: formatINR(data.emi_load.total_monthly_emi), subtitle: `${formatPercent(data.emi_load.emi_to_income_ratio)} of income` },
            { label: "Avg EOM balance", value: formatINR(data.cash_flow.avg_end_of_month_balance), subtitle: data.cash_flow.balance_trajectory },
            { label: "Negative months", value: String(data.cash_flow.months_with_negative_balance), subtitle: "of 3 months" },
          ].map((card) => (
            <motion.div key={card.label} variants={fadeUp}>
              <MetricCard {...card} />
            </motion.div>
          ))}
        </motion.div>

        {/* Section C: Income analysis */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[#09090B]">Income analysis</p>
            <Separator className="flex-1" style={{ borderColor: "#E4E4E7" }} />
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {[
              ["Primary source", data.income.primary_source],
              ["Monthly salary", formatINR(data.income.monthly_salary)],
              ["Salary date consistency", data.income.salary_date_consistency],
              ["Secondary income", data.income.secondary_income ?? "None"],
              ["Secondary avg monthly", formatINR(data.income.secondary_avg_monthly)],
              ["Total monthly income", formatINR(data.income.total_monthly_income)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-1 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <span className="text-[13px]" style={{ color: "#52525B" }}>{label}</span>
                <span className="text-[13px] font-mono text-[#09090B]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section D: EMI obligations */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[#09090B]">EMI obligations</p>
            <Separator className="flex-1" style={{ borderColor: "#E4E4E7" }} />
          </div>
          <EmiTable obligations={data.emi_load.obligations} total={data.emi_load.total_monthly_emi} creditCardTrend={data.emi_load.credit_card_trend} />
        </div>

        {/* Section E: Red flags */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[#09090B]">Red flags ({data.red_flags.length})</p>
            <Separator className="flex-1" style={{ borderColor: "#E4E4E7" }} />
          </div>
          {data.red_flags.length === 0 ? (
            <p className="text-[13px]" style={{ color: "#52525B" }}>No red flags detected.</p>
          ) : (
            data.red_flags.map((f, i) => <RedFlagRow key={i} flag={f.flag} severity={f.severity} detail={f.detail} />)
          )}
        </div>

        {/* Section F: Recommendation */}
        <div
          className="rounded-xl p-4"
          style={{ background: "#F4F4F5", borderLeft: `3px solid ${tierBorderColor[data.risk_tier.tier]}`, border: "1px solid #E4E4E7" }}
        >
          <p className="text-[11px] uppercase tracking-widest mb-2" style={{ color: "#71717A" }}>Recommendation</p>
          <p className="text-[13px] leading-relaxed text-[#09090B]">{data.recommendation}</p>
        </div>

        {/* Section G: Footer actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onReset} className="text-[13px]">Analyze another statement</Button>
          <Button variant="ghost" onClick={handleExport} className="text-[13px]" style={{ color: "#71717A" }}>Export as JSON</Button>
        </div>

      </TabsContent>
    </Tabs>
  );
}
