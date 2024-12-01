"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted to access the resolved theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`${resolvedTheme === "dark" ? "dark" : ""}`}>
      {children}

      {/* Floating Button */}
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg transition hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        Switch to {resolvedTheme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}
