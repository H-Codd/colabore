import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
};

export function AuthShell({
  title,
  description,
  children,
  footerText,
  footerLinkHref,
  footerLinkLabel,
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center .bg-\[radial-gradient\(circle_at_top_left\,_rgba\(59\,130\,246\,0\.18\)\,_transparent_40\%\)\,linear-gradient\(135deg\,_rgba\(255\,255\,255\,0\.95\)\,_rgba\(241\,245\,249\,0\.95\)\)\] px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-background/95 shadow-2xl backdrop-blur">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden bg-gradient-to-br from-primary/90 via-sky-600 to-blue-950 p-8 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-100">
                Colabore
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight">
                Organize projetos e acompanhe sua equipe em um só lugar.
              </h1>
              <p className="mt-4 max-w-md text-sm text-blue-50/90">
                Acesse sua conta para continuar gerenciando tarefas, documentos
                e o fluxo de trabalho do time.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-blue-50">
              <p className="font-medium">Experiência simples e responsiva</p>
              <p className="mt-2 text-blue-100/80">
                Tudo funciona bem em celulares, tablets e desktops sem perder a
                usabilidade.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-12">
            <div className="mb-8">
              <p className="text-sm font-medium text-primary">Autenticação</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                {description}
              </p>
            </div>

            {children}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {footerText}{" "}
              <Link
                href={footerLinkHref}
                className="font-semibold text-primary underline-offset-4 transition hover:underline"
              >
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
