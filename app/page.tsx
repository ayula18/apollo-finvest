"use client";

import { useEffect, useState } from "react";
import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";
import { HeroSection } from "./components/sections/hero";
import { BusinessSection } from "./components/sections/business";
import { PlaybookSection } from "./components/sections/playbook";
import { ToolSection } from "./components/sections/tool-section";
import { SprintSection } from "./components/sections/sprint";
import { NAV_ITEMS } from "@/lib/nav-items";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const trigger = window.innerHeight * 0.4;
      let current = NAV_ITEMS[0].id;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= trigger) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FAFAFA" }}>
      <Header activeSection={activeSection} />
      <main className="pt-14">
        <HeroSection />
        <BusinessSection />
        <PlaybookSection />
        <ToolSection />
        <SprintSection />
        <Footer />
      </main>
    </div>
  );
}
