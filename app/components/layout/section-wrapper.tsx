import { cn } from "@/lib/utils";

const widths = {
  narrow: "max-w-2xl",   // hero subtitle, footer text
  default: "max-w-3xl",  // playbook, sprint, tool — readable column width
  wide: "max-w-6xl",     // business — equation card needs horizontal room
};

interface SectionWrapperProps {
  children: React.ReactNode;
  size?: keyof typeof widths;
  className?: string;
}

export function SectionWrapper({ children, size = "default", className }: SectionWrapperProps) {
  return (
    <div className={cn(widths[size], "mx-auto w-full px-6 md:px-10", className)}>
      {children}
    </div>
  );
}
