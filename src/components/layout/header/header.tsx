"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Laptop, Menu, Moon, Search, Sparkles, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AppSidebar } from "@/components/layout/header/sidebar";

export const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const setThemeMode = (mode: "light" | "dark" | "system") => {
    setTheme(mode);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logoBlack.svg"
            alt="Colabore logo"
            width={70}
            height={70}
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Colabore
            </span>
            <span className="text-sm text-muted-foreground">
              Gestão de projetos
            </span>
          </div>
        </Link>

        <div className="order-3 w-full md:order-0 md:flex-1 md:max-w-md">
          <label className="flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-2 shadow-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Selecionar tema"
                />
              }
            >
              {mounted && resolvedTheme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setThemeMode("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setThemeMode("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Escuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setThemeMode("system")}>
                <Laptop className="mr-2 h-4 w-4" />
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Abrir menu" />
              }
            >
              <Menu className="h-4 w-4" />
            </DialogTrigger>
            <AppSidebar />
          </Dialog>
        </div>
      </div>
    </header>
  );
};
