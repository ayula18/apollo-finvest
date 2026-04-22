"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
  delay?: number;
}

export function StatCounter({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  sub,
  delay = 0,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const start = Date.now();
      const duration = 1200;
      const step = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else setValue(target);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, target, delay]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString("en-IN");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: delay / 1000 }}
      className="rounded-xl p-6 border flex flex-col gap-1"
      style={{ background: "#FFFFFF", borderColor: "#E4E4E7" }}
    >
      <p
        className="text-[42px] font-semibold leading-none tabular-nums"
        style={{ color: "#1D9E75", letterSpacing: "-0.02em" }}
      >
        {prefix}{display}{suffix}
      </p>
      <p className="text-[14px] font-medium text-[#09090B] mt-2">{label}</p>
      <p className="text-[12px] leading-relaxed" style={{ color: "#71717A" }}>{sub}</p>
    </motion.div>
  );
}
