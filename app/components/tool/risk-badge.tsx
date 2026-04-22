type Tier = "Green" | "Amber" | "Red";

const styles: Record<Tier, { bg: string; text: string; border: string; label: string }> = {
  Green: { bg: "#F0FDF4", text: "#16A34A", border: "#86EFAC", label: "LOW RISK" },
  Amber: { bg: "#FFFBEB", text: "#D97706", border: "#FDE68A", label: "MODERATE RISK" },
  Red:   { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA", label: "HIGH RISK" },
};

export function RiskBadge({ tier }: { tier: Tier }) {
  const s = styles[tier];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide border"
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.text }} />
      {tier.toUpperCase()} · {s.label}
    </span>
  );
}
