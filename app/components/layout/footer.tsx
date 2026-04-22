export function Footer() {
  return (
    <footer
      className="border-t mt-24 py-12"
      style={{ borderColor: "#E4E4E7" }}
    >
      <div className="w-full px-6 md:px-10 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="text-[15px] font-medium text-[#09090B]">Ayush Lahoti</p>
          <p className="text-[13px] mt-1" style={{ color: "#71717A" }}>
            Submitted for AI Generalist · Apollo Finvest · April 2026
          </p>
          <div className="flex gap-4 mt-3">
            <a href="mailto:ayush_lahoti@pg26.mesaschool.co" className="text-[13px] transition-colors hover:text-[#09090B]" style={{ color: "#A1A1AA" }}>
              ayush_lahoti@pg26.mesaschool.co
            </a>
            <a href="https://linkedin.com/in/ayuula18/" target="_blank" rel="noopener noreferrer"
              className="text-[13px] transition-colors hover:text-[#09090B]" style={{ color: "#A1A1AA" }}>
              LinkedIn →
            </a>
            <a href="https://ayushlahoti.mesaschool.co.in/" target="_blank" rel="noopener noreferrer"
              className="text-[13px] transition-colors hover:text-[#09090B]" style={{ color: "#A1A1AA" }}>
              Portfolio →
            </a>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[13px]" style={{ color: "#71717A" }}>
            Built with Next.js, shadcn/ui, OpenAI API
          </p>
        </div>
      </div>
    </footer>
  );
}
