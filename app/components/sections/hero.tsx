"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

const cubicEase = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const wordVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: cubicEase, delay: i * 0.06 },
  }),
};

function AnimatedHeading({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
    >
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 bg-grid pointer-events-none"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1.2 }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Label chip */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest mb-8"
          style={{ background: "#DCFCE7", color: "#1D9E75" }}
        >
          AI Edge Playbook - Apollo Finvest - April 2026
        </motion.div>

        {/* H1 with word-by-word reveal */}
        <h1
          className="text-[48px] font-medium leading-tight max-w-xl"
          style={{ letterSpacing: "-0.03em", color: "#09090B" }}
        >
          <AnimatedHeading text="What I'd build" />
          <br />
          <AnimatedHeading text="in my first 90 days." />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-[16px] mt-6 max-w-[520px] leading-relaxed"
          style={{ color: "#52525B" }}
        >
          A structured analysis of Apollo&apos;s lending lifecycle through an AI lens.
          A live working tool and a day-one execution plan.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          className="flex gap-3 mt-10"
        >
          {/* Teal CTA with shimmer */}
          <button
            onClick={() => scrollTo("business")}
            className="relative px-6 py-2.5 rounded-lg text-[14px] font-medium text-white overflow-hidden"
            style={{ background: "#1D9E75" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#179268")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1D9E75")}
          >
            <motion.span
              className="absolute inset-0 rounded-lg pointer-events-none"
              animate={{ opacity: [0, 0.12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: "linear-gradient(90deg, transparent, #fff, transparent)" }}
            />
            Explore the playbook
          </button>

          <button
            onClick={() => scrollTo("tool")}
            className="px-6 py-2.5 rounded-lg text-[14px] font-medium text-[#09090B] transition-colors border"
            style={{ background: "transparent", borderColor: "#D4D4D8" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#A1A1AA")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D4D4D8")}
          >
            Jump to live demo
          </button>
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.4 }}
        className="text-[12px] absolute bottom-8"
        style={{ color: "#A1A1AA" }}
      >
        Prepared by Ayush Lahoti - Submitted for AI Generalist role
      </motion.p>
    </section>
  );
}
