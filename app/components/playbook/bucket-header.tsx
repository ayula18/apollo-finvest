"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface BucketHeaderProps {
  number: string;
  title: string;
  description: string;
}

const viewport = { once: true, margin: "-60px" };

export function BucketHeader({ number, title, description }: BucketHeaderProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="flex flex-col gap-2 mb-6 pt-4"
    >
      <div className="flex items-center gap-3">
        <span
          className="px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-widest"
          style={{ background: "#DCFCE7", color: "#1D9E75" }}
        >
          BUCKET {number}
        </span>
        <h3 className="text-[18px] font-medium text-[#09090B]" style={{ letterSpacing: "-0.01em" }}>
          {title}
        </h3>
      </div>
      {/* Teal accent line */}
      <motion.div
        className="h-0.5 rounded-full"
        style={{ background: "#1D9E75", width: 0 }}
        whileInView={{ width: 32 }}
        viewport={viewport}
        transition={{ duration: 0.4, delay: 0.15 }}
      />
      <p className="text-[13px]" style={{ color: "#71717A" }}>{description}</p>
    </motion.div>
  );
}
