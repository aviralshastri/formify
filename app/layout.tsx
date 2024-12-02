import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { DataProvider } from "@/context/DataContext";
import ThemeWrapper from "@/components/custom/ThemeWrapper";

export const metadata: Metadata = {
  title: "Asterforms",
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
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
