import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400"] });

export const metadata: Metadata = {
  title: "Apollo Cash — AI Edge Playbook · Ayush Lahoti",
  description: "What I'd build in my first 90 days. A structured analysis of Apollo's lending lifecycle through an AI lens.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <body className="min-h-full" style={{ background: "#FAFAFA", color: "#09090B" }}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
