import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/app/components/ToastProvider";

export const metadata: Metadata = {
  title: "Nomyx - Agile Infrastructure for Institutional Capital",
  description:
    "Tokenization infrastructure for institutional capital with upgradeable smart contracts and built-in compliance.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
