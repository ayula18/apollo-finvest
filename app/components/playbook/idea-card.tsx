"use client";

import { motion } from "framer-motion";
import { KpiChip } from "./kpi-chip";
import { fadeUp } from "@/lib/animations";

interface IdeaCardProps {
  number: string;
  title: string;
  flowLine: string;
  logic: string;
  ifItFails: string;
  kpiChips: string[];
  demoLink?: boolean;
}

export function IdeaCard({ number, title, flowLine, logic, ifItFails, kpiChips, demoLink }: IdeaCardProps) {
  const scrollToTool = () => {
    document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ scale: 1.008, transition: { type: "spring", stiffness: 400, damping: 30 } }}
      className="rounded-xl border p-6 space-y-5"
      style={{ background: "#FFFFFF", borderColor: "#E4E4E7" }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <span className="text-[32px] font-medium leading-none select-none" style={{ color: "#D4D4D8" }}>
          {number}
        </span>
        <div>
          <h4 className="text-[16px] font-medium text-[#09090B]">{title}</h4>
          {/* Flow line with left-to-right reveal on enter */}
          <div className="relative mt-1.5 overflow-hidden">
            <p
              className="text-[11px] leading-relaxed"
              style={{ fontFamily: "var(--font-mono), monospace", color: "#A1A1AA" }}
            >
              {flowLine}
            </p>
            <motion.div
              className="absolute bottom-0 left-0 h-px"
              style={{ background: "#1D9E75" }}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            />
          </div>
        </div>
      </div>

      {/* Logic block */}
      <div
        className="rounded-lg p-4 border-l-2"
        style={{ background: "#F4F4F5", borderLeftColor: "#1D9E75" }}
      >
        <p className="text-[11px] uppercase tracking-widest mb-1.5" style={{ color: "#1D9E75" }}>LOGIC</p>
        <p className="text-[13px] leading-relaxed" style={{ color: "#52525B" }}>{logic}</p>
      </div>

      {/* If it fails block */}
      <div
        className="rounded-lg p-4 border-l-2"
        style={{ background: "#FFFBEB", borderLeftColor: "#F59E0B" }}
      >
        <p className="text-[11px] uppercase tracking-widest mb-1.5" style={{ color: "#D97706" }}>IF IT FAILS</p>
        <p className="text-[13px] leading-relaxed" style={{ color: "#52525B" }}>{ifItFails}</p>
      </div>

      {/* KPI chips + optional demo link */}
      <div className="flex flex-wrap gap-2 items-center">
        {kpiChips.map((chip) => (
          <KpiChip key={chip} label={chip} />
        ))}
        {demoLink && (
          <button
            onClick={scrollToTool}
            className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-medium border transition-colors"
            style={{ background: "transparent", borderColor: "#1D9E7540", color: "#1D9E75" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#DCFCE7")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Working demo in Section 03 →
          </button>
        )}
      </div>
    </motion.div>
  );
}
