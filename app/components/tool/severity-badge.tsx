type Severity = "High" | "Medium" | "Low";

const styles: Record<Severity, { bg: string; text: string }> = {
  High:   { bg: "#FEF2F2", text: "#DC2626" },
  Medium: { bg: "#FFFBEB", text: "#D97706" },
  Low:    { bg: "#EFF6FF", text: "#2563EB" },
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  const s = styles[severity];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide shrink-0"
      style={{ background: s.bg, color: s.text }}
    >
      {severity.toUpperCase()}
    </span>
  );
}
