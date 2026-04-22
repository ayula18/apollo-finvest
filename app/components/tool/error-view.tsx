import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="space-y-4">
      <Alert variant="destructive" style={{ background: "#FEF2F2", borderColor: "#FECACA" }}>
        <AlertTriangle className="h-4 w-4" style={{ color: "#DC2626" }} />
        <AlertTitle style={{ color: "#DC2626" }}>Analysis failed</AlertTitle>
        <AlertDescription style={{ color: "#991B1B" }}>{message}</AlertDescription>
      </Alert>
      <Button variant="outline" onClick={onRetry} className="text-[13px]">Try again</Button>
    </div>
  );
}
