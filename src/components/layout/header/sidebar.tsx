"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutGrid } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const sidebarItems = [
  { label: "Início", href: "/", icon: LayoutGrid },
  { label: "Projetos", href: "/projects", icon: LayoutGrid },
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
];

export const AppSidebar = () => {
  return (
    <DialogContent className="top-0 right-0 left-auto h-full max-w-sm translate-x-0 translate-y-0 rounded-none border-l bg-background p-0 data-open:slide-in-from-right data-closed:slide-out-to-right">
      <div className="flex h-full flex-col">
        <DialogHeader className="border-b p-4">
          <div className="flex items-center gap-3">
              <DialogTitle className="text-left">Colabore</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 space-y-2 p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </DialogContent>
  );
};
