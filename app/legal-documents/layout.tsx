import type { ReactNode } from "react";

import { CustomCursor, Footer, Navbar } from "@/app/home";

import { LegalSidebar } from "./LegalSidebar";

export default function LegalDocumentsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white text-ink">
      <CustomCursor />
      <Navbar variant="light" transparentInitially={true} hideBorder={true} />

      <main className="bg-white pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="custom-container">
          <div className="grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-start xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-12">
            <LegalSidebar />
            <section className="min-w-0">
              {children}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
