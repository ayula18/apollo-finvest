export function formatINR(value: number): string {
  return "₹" + value.toLocaleString("en-IN");
}

export function formatPercent(value: number): string {
  return (value * 100).toFixed(0) + "%";
}

export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1) + "…";
}
