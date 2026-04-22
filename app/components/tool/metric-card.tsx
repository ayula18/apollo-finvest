export function MetricCard({ label, value, subtitle }: { label: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-xl p-4 border" style={{ background: "#F4F4F5", borderColor: "rgba(0,0,0,0.08)" }}>
      <p className="text-[11px] uppercase tracking-widest mb-2" style={{ color: "#71717A" }}>{label}</p>
      <p className="text-xl font-semibold text-[#09090B]">{value}</p>
      <p className="text-[12px] mt-1" style={{ color: "#52525B" }}>{subtitle}</p>
    </div>
  );
}
