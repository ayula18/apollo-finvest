"use client";

import { useRef, useState } from "react";
import { Loader2, FileUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SAMPLE_STATEMENT } from "@/lib/sample-data";

export function StatementInput({
  value,
  onChange,
  onAnalyze,
  onPdf,
}: {
  value: string;
  onChange: (v: string) => void;
  onAnalyze: () => void;
  onPdf: (file: File) => void;
}) {
  const [pending, setPending] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextAnalyze = () => {
    setPending(true);
    onAnalyze();
  };

  const handleFileAnalyze = () => {
    if (!selectedFile) return;
    setPending(true);
    onPdf(selectedFile);
  };

  const acceptFile = (file: File) => {
    if (file.type === "application/pdf") setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) acceptFile(file);
  };

  return (
    <div className="space-y-4">
      {/* Text input */}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={SAMPLE_STATEMENT}
        className="statement-textarea min-h-[320px] resize-y"
        style={{ background: "#F4F4F5", borderColor: "#E4E4E7" }}
      />
      <div className="flex items-center gap-4">
        <Button
          onClick={handleTextAnalyze}
          disabled={pending}
          className="px-6 py-2.5 text-[14px] font-medium rounded-lg flex items-center gap-2"
          style={{ background: "#1D9E75", color: "#fff" }}
        >
          {pending && <Loader2 size={14} className="animate-spin" />}
          {pending ? "Analyzing..." : "Run analysis"}
        </Button>
        <span className="text-[13px]" style={{ color: "#71717A" }}>
          Pre-loaded with sample SBI statement
        </span>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <div className="flex-1 h-px" style={{ background: "#E4E4E7" }} />
        <span className="text-[11px] uppercase tracking-widest" style={{ color: "#A1A1AA" }}>or</span>
        <div className="flex-1 h-px" style={{ background: "#E4E4E7" }} />
      </div>

      {/* PDF upload zone */}
      <div
        className="rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors"
        style={{
          borderColor: dragOver ? "#1D9E75" : "#D4D4D8",
          background: dragOver ? "#F0FDF4" : "transparent",
        }}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) acceptFile(f); }}
        />

        {selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <FileUp size={20} style={{ color: "#1D9E75" }} />
            <p className="text-[13px] font-medium text-[#09090B]">{selectedFile.name}</p>
            <p className="text-[11px]" style={{ color: "#71717A" }}>
              {(selectedFile.size / 1024).toFixed(0)} KB
            </p>
            <Button
              onClick={(e) => { e.stopPropagation(); handleFileAnalyze(); }}
              disabled={pending}
              className="px-6 py-2 text-[14px] font-medium rounded-lg flex items-center gap-2 mt-1"
              style={{ background: "#1D9E75", color: "#fff" }}
            >
              {pending && <Loader2 size={14} className="animate-spin" />}
              {pending ? "Analyzing..." : "Run analysis"}
            </Button>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
              className="text-[12px] transition-colors"
              style={{ color: "#A1A1AA" }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <FileUp size={20} style={{ color: "#A1A1AA" }} />
            <p className="text-[13px] font-medium text-[#09090B]">Drop a bank statement PDF here</p>
            <p className="text-[12px]" style={{ color: "#71717A" }}>or click to browse - max 10 MB</p>
          </div>
        )}
      </div>

      <p className="text-[12px]" style={{ color: "#A1A1AA" }}>
        Powered by OpenAI API - Processes in ~5 seconds
      </p>
    </div>
  );
}
