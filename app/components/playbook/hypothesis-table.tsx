"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const ROWS = [
  {
    hypothesis: "Bank statements add signal beyond bureau score",
    failure: "Data is inconsistent, thin-file noise exceeds signal",
    pivot: "Shift to UPI transaction frequency and app behavior as primary alternate inputs",
  },
  {
    hypothesis: "Pre-delinquency signals exist in repayment timing",
    failure: "Timing drift does not correlate with actual defaults",
    pivot: "Widen feature set to bank balance at payment date and failed UPI attempts",
  },
  {
    hypothesis: "Partner anomalies can be auto-detected reliably",
    failure: "High false positive rate, team stops trusting alerts",
    pivot: "Narrow to 3 high-confidence signals only, rebuild trust before expanding scope",
  },
  {
    hypothesis: "Regulatory reporting can be templatized",
    failure: "RBI format changes break the mapping layer",
    pivot: "Make template mapping configurable, not hardcoded, treat formats as inputs",
  },
  {
    hypothesis: "Senti data predicts collection success per borrower",
    failure: "Per-borrower data is too sparse",
    pivot: "Move to cohort-level optimization first, scale to per-borrower once book matures",
  },
];

export function HypothesisTable() {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
      <p className="text-[16px] font-medium text-[#09090B] mb-1.5">What if the hypothesis fails?</p>
      <p className="text-[13px] mb-4" style={{ color: "#71717A" }}>
        Every idea has a defined failure signal and a pivot. This is how the ideas were stress-tested.
      </p>
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E4E4E7" }}>
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E4E4E7" }}>
              {["Hypothesis", "Failure Signal", "Pivot"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-[11px] uppercase tracking-widest font-medium"
                  style={{ color: "#71717A" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: i < ROWS.length - 1 ? "1px solid #E4E4E7" : "none",
                  background: "#FFFFFF",
                }}
              >
                <td className="px-4 py-3 text-[#09090B]">{row.hypothesis}</td>
                <td className="px-4 py-3" style={{ color: "#D97706" }}>{row.failure}</td>
                <td className="px-4 py-3" style={{ color: "#52525B" }}>{row.pivot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
