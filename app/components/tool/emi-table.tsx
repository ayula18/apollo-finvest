import { Separator } from "@/components/ui/separator";
import { formatINR } from "@/lib/format";
import type { EmiObligation } from "@/lib/types";

export function EmiTable({ obligations, total, creditCardTrend }: { obligations: EmiObligation[]; total: number; creditCardTrend: string }) {
  return (
    <div>
      <div className="space-y-2">
        {obligations.map((ob, i) => (
          <div key={i} className="flex items-center justify-between py-1.5">
            <div>
              <span className="text-[13px] text-[#09090B]">{ob.lender}</span>
              <span className="ml-2 text-[11px]" style={{ color: "#71717A" }}>{ob.type}</span>
            </div>
            <span className="font-mono text-[13px] text-[#09090B]">{formatINR(ob.monthly_emi)}</span>
          </div>
        ))}
      </div>
      <Separator className="my-2" />
      <div className="flex items-center justify-between py-1.5">
        <span className="text-[13px] font-semibold text-[#09090B]">Total monthly obligation</span>
        <span className="font-mono text-[13px] font-semibold text-[#09090B]">{formatINR(total)}</span>
      </div>
      {creditCardTrend && (
        <p className="text-[12px] mt-3" style={{ color: "#52525B" }}>Credit card trend: {creditCardTrend}</p>
      )}
    </div>
  );
}
