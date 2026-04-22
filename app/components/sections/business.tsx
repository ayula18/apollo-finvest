"use client";

import { motion } from "framer-motion";
import { Mic, ScanFace, RefreshCw } from "lucide-react";
import { fadeUp, slideLeft, flipUp, staggerFast, staggerSlow } from "@/lib/animations";
import { StatCounter } from "./stat-counter";

const viewport = { once: true, margin: "-80px" };

const SHIPPED = [
  {
    name: "Senti",
    Icon: Mic,
    description:
      "Audio sentiment analysis on 50,000 to 60,000 monthly collection calls. Multilingual across Hindi, English, and regional languages. Ops review time collapsed from 5 hours per week to under 30 minutes. Now deployed across partner ecosystems.",
  },
  {
    name: "FaceMatch",
    Icon: ScanFace,
    description:
      "AI-powered identity verification for KYC. Instant digital identity confirmation across all partner integrations via the Bureau and CKYC API stack.",
  },
  {
    name: "Auto-Reconciliation",
    Icon: RefreshCw,
    description:
      "AWS Serverless reconciliation system integrating Razorpay, Cashfree, and other gateways for end-of-day settlements. Reduced finance team manual work by 90%.",
  },
];

const EQUATION_ROWS = [
  {
    label: "UNIT",
    lines: [
      "Profit_Loan = (Amount x Rate x Tenure) + Fee - CoF - (Default_Rate x LGD) - Tech_Cost",
    ],
  },
  {
    label: "STAKEHOLDER",
    lines: [
      "Profit_Term   = Partner_AUM x NIM - Support_Cost",
      "Profit_CoLend = Apollo_Book x (Yield - CoF - Default_Loss) - Partner_Share",
      "Profit_Direct = Direct_Book x (Yield - CoF - Default_Loss) - CAC - Servicing",
    ],
  },
  {
    label: "COMPANY",
    lines: [
      "Annual_Profit = Interest + Fees - Cost_of_Funds - Credit_Losses - OpEx - Tech",
    ],
  },
];

export function BusinessSection() {
  return (
    <section id="business" className="py-24">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 space-y-16">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <p className="text-[11px] uppercase tracking-widest font-medium mb-3" style={{ color: "#1D9E75" }}>
            HOW APOLLO MAKES MONEY
          </p>
          <motion.div
            className="h-0.5 mb-4 rounded-full"
            style={{ background: "#1D9E75", width: 0 }}
            whileInView={{ width: 32 }}
            viewport={viewport}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <h2 className="text-[28px] font-medium leading-snug text-[#09090B]" style={{ letterSpacing: "-0.02em" }}>
            Before proposing anything,<br />
            understand the architecture.
          </h2>
        </motion.div>

        {/* Side-by-side: text left (2/5), equation card right (3/5) */}
        <div className="grid md:grid-cols-5 gap-10 items-start">

          {/* Left — body text */}
          <motion.div
            className="md:col-span-2 space-y-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="text-[14px] leading-relaxed" style={{ color: "#52525B" }}>
              Apollo Finvest is not a lender. It is lending infrastructure. An NBFC license, capital, and a
              full-stack API platform called Sonic that lets any fintech start digital lending in 48 hours.
              With 28 people running 50+ partner fintechs and a direct retail book growing at 200% quarter
              over quarter, the constraint is not capital or partnerships. It is operational surface area.
              Every process that scales with AUM without AI is a ceiling on the business.
            </p>
            <p className="text-[14px] leading-relaxed" style={{ color: "#52525B" }}>
              The profit equation is simple: Annual Profit equals AUM times NIM minus Credit Losses minus
              OpEx minus Tech. Every lever worth pulling either grows AUM, protects NIM, reduces credit
              losses, or cuts OpEx. AI does not change what Apollo optimizes. It changes how accurately
              and at what scale they can do it with 28 people.
            </p>
          </motion.div>

          {/* Right — equation card, 3/5 width so mono lines never wrap */}
          <motion.div
            className="md:col-span-3 rounded-xl p-6 border"
            style={{ background: "#FFFFFF", borderColor: "#E4E4E7", borderLeft: "2px solid #1D9E75" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="mb-5">
              <p className="text-[13px] font-medium text-[#09090B] mb-0.5">The Fundamental Equations</p>
              <p className="text-[11px]" style={{ color: "#A1A1AA" }}>Formula-only. Three levels.</p>
            </div>
            <motion.div
              variants={staggerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="space-y-5"
            >
              {EQUATION_ROWS.map((row) => (
                <motion.div key={row.label} variants={slideLeft}>
                  <span className="text-[11px] uppercase tracking-widest" style={{ color: "#A1A1AA" }}>
                    {row.label}
                  </span>
                  <div className="mt-1.5 space-y-0.5 overflow-x-auto">
                    {row.lines.map((line) => (
                      <p key={line} className="text-[12px] leading-relaxed whitespace-nowrap" style={{ fontFamily: "var(--font-mono), monospace", color: "#52525B" }}>
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>

        {/* Stat counters — each card owns its own entrance, no parent stagger */}
        <div className="grid grid-cols-3 gap-4">
          <StatCounter target={38} delay={0} label="employees" sub="running Rs 900Cr+ in lifetime disbursements" />
          <StatCounter target={50} delay={120} suffix="+" label="fintech partners" sub="on Apollo's lending rails today" />
          <StatCounter target={1.2} delay={240} decimals={1} suffix="%" label="GNPA rate" sub="vs 2.9% industry average" />
        </div>

        {/* Already AI-ified */}
        <div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="mb-5">
            <p className="text-[11px] uppercase tracking-widest font-medium mb-1" style={{ color: "#1D9E75" }}>
              WHAT APOLLO HAS ALREADY AI-IFIED
            </p>
            <p className="text-[13px]" style={{ color: "#71717A" }}>
              These exist. The playbook builds on top of them, not instead of them.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-4"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {SHIPPED.map((item) => (
              <motion.div
                key={item.name}
                variants={flipUp}
                className="rounded-xl p-5 border flex flex-col gap-3"
                style={{ background: "#FFFFFF", borderColor: "#E4E4E7" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.Icon size={14} style={{ color: "#1D9E75" }} />
                    <p className="text-[13px] font-medium text-[#09090B]">{item.name}</p>
                  </div>
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded"
                    style={{ background: "#DCFCE7", color: "#16A34A" }}
                  >
                    Live in production
                  </span>
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: "#71717A" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
