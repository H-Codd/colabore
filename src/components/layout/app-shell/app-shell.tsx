"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideShell = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hideShell && <Header />}
      <main className="min-h-screen">{children}</main>
      {!hideShell && <Footer />}
    </>
  );
}
