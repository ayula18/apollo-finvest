export function KpiChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-medium border"
      style={{ background: "#DCFCE7", borderColor: "#1D9E7540", color: "#16A34A" }}
    >
      {label}
    </span>
  );
}
