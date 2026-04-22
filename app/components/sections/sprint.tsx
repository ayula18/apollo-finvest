"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Database, Shield, TrendingUp } from "lucide-react";
import { fadeUp, slideLeft, staggerFast } from "@/lib/animations";

const viewport = { once: true, margin: "-80px" };

const WEEKS = [
  {
    badge: "01",
    label: "WEEK 1-2",
    title: "Partner Portfolio Intelligence Dashboard",
    accent: "#1D9E75",
    effort: "Medium",
    why: "AEO already exists in Sonic but the insight layer does not. This is the fastest way to demonstrate value to Mikhil and Diksha directly. Real data, real partners, real output. No new data infrastructure required.",
    kpi: "Anomaly detection latency: from weekly manual review to under 24 hours",
  },
  {
    badge: "02",
    label: "WEEK 3-4",
    title: "Bank Statement Analyzer (Apollo Cash)",
    accent: "#1D9E75",
    effort: "Medium",
    why: "Apollo Cash is growing 200% QoQ. The underwriting bottleneck is live and getting worse. This directly protects GNPA on the fastest-growing revenue line. The PRD for this tool is already written and one working prototype exists.",
    kpi: "Bank statement processing time: under 2 minutes per application",
  },
  {
    badge: "03",
    label: "WEEK 5-6",
    title: "Pre-Delinquency Early Warning System",
    accent: "#D97706",
    effort: "Medium",
    why: "Once the bank statement tool is live and generating data, behavioral signals from the direct book start accumulating. Week 5-6 is the first point where there is enough Apollo Cash repayment history to train the early warning model meaningfully.",
    kpi: "Early warning lead time: 7 to 14 days before missed payment",
  },
  {
    badge: "04",
    label: "WEEK 7-8",
    title: "Regulatory Reporting Agent",
    accent: "#D97706",
    effort: "Low",
    why: "By week 7 there is trust built with the team from the first three deliveries. Regulatory reporting is high-consequence. Shipping it after the team has seen quality output from the first three tools means they will trust the agent's drafts. Shipping it first would be too risky.",
    kpi: "Report preparation time: -80% vs current manual process",
  },
  {
    badge: "05",
    label: "WEEK 9-12",
    title: "Senti v2 + Partner Intake Agent",
    accent: "#A1A1AA",
    effort: "Medium",
    why: "These are longer-horizon plays. Senti v2 requires historical call data to be meaningful. Partner intake requires understanding Apollo's diligence process from the inside. Both can only be built well after 8 weeks of context accumulation.",
    kpi: "Collection success rate: +20% vs current baseline",
  },
];

const PRIORITY = [
  {
    Icon: Database,
    title: "Data before models",
    body: "Every AI system needs data. The partner portfolio monitor and bank statement tool generate the datasets that the pre-delinquency model and Senti v2 learn from. The sequence is not arbitrary. It is a dependency chain.",
  },
  {
    Icon: Shield,
    title: "Low-risk first",
    body: "Partner portfolio monitoring and bank statement analysis are advisory tools. A wrong output can be ignored. Regulatory reporting and collection optimization have direct operational consequences. They come after the team has seen the quality of the AI output.",
  },
  {
    Icon: TrendingUp,
    title: "Prove AUM x NIM first",
    body: "The first three deliveries protect or grow AUM and NIM directly. These are the two variables that move Annual Profit the most. Everything else is OpEx reduction, which is valuable but secondary.",
  },
];

export function SprintSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 80%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="sprint" className="py-24">
      <div className="max-w-5xl mx-auto w-full px-6 md:px-10 space-y-16">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <p className="text-[11px] uppercase tracking-widest font-medium mb-3" style={{ color: "#1D9E75" }}>
            90-DAY SPRINT PLAN
          </p>
          <motion.div
            className="h-0.5 mb-4 rounded-full"
            style={{ background: "#1D9E75", width: 0 }}
            whileInView={{ width: 32 }}
            viewport={viewport}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <h2 className="text-[28px] font-medium leading-snug text-[#09090B]" style={{ letterSpacing: "-0.02em" }}>
            What I&apos;d ship first.
          </h2>
          <p className="text-[14px] mt-3 max-w-[560px] leading-relaxed" style={{ color: "#52525B" }}>
            Not a roadmap. An opinionated sequence with explicit prioritization logic.
            The order is not random. Each week builds on the previous one.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Scroll-driven teal vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: "#E4E4E7" }} />
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-px origin-top"
            style={{ background: "#1D9E75", scaleY }}
          />

          <div className="space-y-5 pl-14">
            {WEEKS.map((week, i) => (
              <motion.div
                key={week.badge}
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05 }}
                className="relative rounded-xl border p-6"
                style={{
                  background: "#FFFFFF",
                  borderColor: "#E4E4E7",
                  borderLeft: `3px solid ${week.accent}`,
                }}
              >
                {/* Badge on the line */}
                <div
                  className="absolute -left-[3.25rem] top-5 w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-mono font-medium"
                  style={{ background: "#FAFAFA", borderColor: week.accent, color: week.accent }}
                >
                  {week.badge}
                </div>

                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest mb-0.5" style={{ color: week.accent }}>
                      {week.label}
                    </p>
                    <h4 className="text-[16px] font-medium text-[#09090B]">{week.title}</h4>
                  </div>
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded shrink-0"
                    style={{ background: "#F4F4F5", color: "#71717A" }}
                  >
                    {week.effort}
                  </span>
                </div>

                <p className="text-[13px] leading-relaxed mb-3" style={{ color: "#52525B" }}>
                  {week.why}
                </p>

                <div className="flex items-start gap-2">
                  <span className="text-[11px] uppercase tracking-widest mt-0.5 shrink-0" style={{ color: "#A1A1AA" }}>
                    KPI
                  </span>
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ fontFamily: "var(--font-mono), monospace", color: "#71717A" }}
                  >
                    {week.kpi}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Prioritization logic */}
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-[14px] font-medium text-[#09090B] mb-5"
          >
            Why this sequence
          </motion.p>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {PRIORITY.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-xl border p-7 flex flex-col gap-3"
                style={{ background: "#FFFFFF", borderColor: "#E4E4E7" }}
              >
                <div className="flex items-center gap-2.5">
                  <item.Icon size={16} style={{ color: "#1D9E75" }} />
                  <p className="text-[14px] font-medium text-[#09090B]">{item.title}</p>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: "#71717A" }}>{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
