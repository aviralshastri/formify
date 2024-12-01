"use client";
import { useTheme } from "next-themes";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <div className={`${resolvedTheme === "dark" ? "dark" : ""}`}>
      {children}
    </div>
  );
}
