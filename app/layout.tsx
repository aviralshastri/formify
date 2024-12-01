import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import ThemeWrapper from "@/components/custom/ThemeWrapper";
export const metadata: Metadata = {
  title: "Formify",
  description: "The AI form builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
          >
            <ThemeWrapper>{children}</ThemeWrapper>
          </ThemeProvider>
        </DataProvider>
      </body>
    </html>
  );
}
