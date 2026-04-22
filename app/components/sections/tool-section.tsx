import { BankStatementTool } from "@/app/components/tool/bank-statement-tool";

export function ToolSection() {
  return (
    <section id="tool" className="py-24">
      <div className="max-w-3xl mx-auto w-full px-6 md:px-10">

        {/* Section header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest mb-5"
            style={{ background: "#DCFCE7", color: "#1D9E75" }}>
            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#1D9E75" }} />
            LIVE · Bank Statement Analyzer
          </div>
          <h2 className="text-[28px] font-medium leading-snug text-[#09090B]" style={{ letterSpacing: "-0.02em" }}>
            Not a slide. A working tool.
          </h2>
          <p className="text-[14px] mt-3 leading-relaxed" style={{ color: "#52525B" }}>
            Idea 01 from the playbook, built. Paste any Indian bank statement
            and get a structured credit assessment in under 15 seconds.
          </p>
        </div>

        <BankStatementTool />
      </div>
    </section>
  );
}
