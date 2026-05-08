import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/app/components/ToastProvider";
import localFont from "next/font/local";

const openSauceSans = localFont({
  src: [
    {
      path: "../public/fonts/OpenSauceSans-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../public/fonts/OpenSauceSans-Regular.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../public/fonts/OpenSauceSans-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/OpenSauceSans-SemiBold.ttf",
      weight: "600",
      style: "semi-bold",
    },
    {
      path: "../public/fonts/OpenSauceSans-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../public/fonts/OpenSauceSans-ExtraBold.ttf",
      weight: "800",
      style: "extra-bold",
    },
  ],
  variable: "--font-open-sauce",
});

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
    <html lang="en" className={`${openSauceSans.variable}`}>
      <body className="antialiased">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
