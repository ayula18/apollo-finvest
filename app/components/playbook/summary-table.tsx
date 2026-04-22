"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const ROWS = [
  {
    bucket: "Apollo Cash Intelligence",
    ideas: "Bank Statement Intelligence + Pre-Delinquency Warning",
    why: "Apollo Cash is 200% QoQ. Underwriting signal and early default prevention compound directly into GNPA, Apollo's core moat.",
    effort: "Medium",
  },
  {
    bucket: "Partner Intelligence",
    ideas: "Portfolio Health Monitor + Partner Intake Agent",
    why: "50+ partners, one team. Sonic has live data. The gap is the intelligence layer that converts data into decisions.",
    effort: "Medium",
  },
  {
    bucket: "Operations Automation",
    ideas: "Regulatory Reporting Agent + Senti v2",
    why: "Compliance reporting is manual. Senti v1 monitors calls. Neither has been extended to its logical next step.",
    effort: "Low",
  },
];

export function SummaryTable() {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
      <p className="text-[11px] uppercase tracking-widest font-medium mb-3" style={{ color: "#71717A" }}>
        Playbook at a glance
      </p>
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E4E4E7" }}>
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E4E4E7" }}>
              {["Bucket", "Ideas", "Why It Matters", "Effort"].map((h) => (
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
                <td className="px-4 py-3 font-medium text-[#09090B]">{row.bucket}</td>
                <td className="px-4 py-3" style={{ color: "#52525B" }}>{row.ideas}</td>
                <td className="px-4 py-3" style={{ color: "#71717A" }}>{row.why}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-0.5 rounded text-[11px] font-medium"
                    style={{ background: "#F4F4F5", color: "#71717A" }}
                  >
                    {row.effort}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
