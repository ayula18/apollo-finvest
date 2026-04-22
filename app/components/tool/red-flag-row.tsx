import { SeverityBadge } from "./severity-badge";

export function RedFlagRow({ flag, severity, detail }: { flag: string; severity: "High" | "Medium" | "Low"; detail: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b last:border-0" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
      <SeverityBadge severity={severity} />
      <div>
        <p className="text-[13px] font-medium text-[#09090B]">{flag}</p>
        <p className="text-[12px] mt-0.5" style={{ color: "#52525B" }}>{detail}</p>
      </div>
    </div>
  );
}
