"use client";

import { useState } from "react";
import { SAMPLE_STATEMENT } from "@/lib/sample-data";
import type { CreditAssessment } from "@/lib/types";
import { StatementInput } from "./statement-input";
import { LoadingSkeleton } from "./loading-skeleton";
import { CreditAssessment as CreditAssessmentView } from "./credit-assessment";
import { ErrorView } from "./error-view";

type View = "input" | "loading" | "results" | "error";

export function BankStatementTool() {
  const [view, setView] = useState<View>("input");
  const [statement, setStatement] = useState(SAMPLE_STATEMENT);
  const [assessment, setAssessment] = useState<CreditAssessment | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const runAnalysis = async (text: string) => {
    setView("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statement: text }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error ?? "Unexpected error. Please try again.");
        setView("error");
        return;
      }
      setAssessment(data as CreditAssessment);
      setView("results");
    } catch {
      setErrorMsg("Network error. Check your connection and try again.");
      setView("error");
    }
  };

  const handleAnalyze = () => runAnalysis(statement);

  const handlePdf = async (file: File) => {
    setView("loading");
    setErrorMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/extract-pdf", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error ?? "PDF extraction failed.");
        setView("error");
        return;
      }
      setStatement(data.text);
      await runAnalysis(data.text);
    } catch {
      setErrorMsg("Network error during PDF extraction. Try again.");
      setView("error");
    }
  };

  return (
    <div>
      {view === "input" && (
        <StatementInput
          value={statement}
          onChange={setStatement}
          onAnalyze={handleAnalyze}
          onPdf={handlePdf}
        />
      )}
      {view === "loading" && <LoadingSkeleton />}
      {view === "results" && assessment && (
        <CreditAssessmentView
          data={assessment}
          rawStatement={statement}
          onReset={() => { setAssessment(null); setView("input"); }}
        />
      )}
      {view === "error" && <ErrorView message={errorMsg} onRetry={() => setView("input")} />}
    </div>
  );
}
