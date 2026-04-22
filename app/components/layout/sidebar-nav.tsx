"use client";

import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/nav-items";

interface SidebarNavProps {
  activeSection: string;
}

export function SidebarNav({ activeSection }: SidebarNavProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      className="fixed left-0 top-14 bottom-0 w-60 hidden md:flex flex-col pt-8 pb-6 border-r"
      style={{ background: "#0A0A0A", borderColor: "#1F1F1F" }}
    >
      <nav className="flex flex-col gap-0.5 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-left w-full overflow-hidden"
              style={{
                background: isActive ? "#1A1A1A" : "transparent",
                color: isActive ? "#FFFFFF" : "#71717A",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {/* Shared layout nav indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                    style={{ background: "#1D9E75" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              <span
                className="text-[11px] font-mono"
                style={{ color: isActive ? "#1D9E75" : "#3F3F46", transition: "color 0.2s" }}
              >
                {item.number}
              </span>
              <span className="text-[13px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-7">
        <p className="text-[11px] uppercase tracking-widest" style={{ color: "#3F3F46" }}>
          April 2026
        </p>
      </div>
    </aside>
  );
}
