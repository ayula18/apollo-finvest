"use client";

import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/nav-items";

interface HeaderProps {
  activeSection: string;
}

export function Header({ activeSection }: HeaderProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 border-b"
      style={{ background: "#FFFFFF", borderColor: "#E4E4E7" }}
    >
      {/* Left: wordmark */}
      <span className="text-[12px] uppercase tracking-widest font-medium" style={{ color: "#71717A" }}>
        AI Edge Playbook
      </span>

      {/* Centre: nav items with sliding indicator */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative px-4 py-1.5 rounded-md text-[13px] transition-colors"
              style={{ color: isActive ? "#09090B" : "#71717A" }}
            >
              {/* Sliding pill background */}
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-md"
                  style={{ background: "#F4F4F5" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {/* Teal underline indicator */}
              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-3 right-3 h-px rounded-full"
                  style={{ background: "#1D9E75" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="text-[10px] font-mono" style={{ color: isActive ? "#1D9E75" : "#A1A1AA" }}>
                  {item.number}
                </span>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Right: byline */}
      <span className="text-[13px]" style={{ color: "#71717A" }}>Ayush Lahoti</span>
    </header>
  );
}
