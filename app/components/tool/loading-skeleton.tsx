import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-xl" style={{ background: "#EBEBEB" }} />)}
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" style={{ background: "#EBEBEB" }} />
        <Skeleton className="h-3 w-full" style={{ background: "#EBEBEB" }} />
        <Skeleton className="h-3 w-4/5" style={{ background: "#EBEBEB" }} />
        <Skeleton className="h-3 w-3/5" style={{ background: "#EBEBEB" }} />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-40" style={{ background: "#EBEBEB" }} />
        <Skeleton className="h-3 w-full" style={{ background: "#EBEBEB" }} />
        <Skeleton className="h-3 w-3/4" style={{ background: "#EBEBEB" }} />
      </div>
      <p className="text-[13px] animate-pulse" style={{ color: "#71717A" }}>Extracting credit signals...</p>
    </div>
  );
}
