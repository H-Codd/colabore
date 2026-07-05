import Link from "next/link";
import { Mail, MessageCircle, Sparkles } from "lucide-react";

const footerLinks = [
  { label: "Sobre", href: "/about" },
  { label: "Projetos", href: "/projects" },
  { label: "Contato", href: "/contact" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-2">
          <p className="text-lg font-semibold tracking-tight text-foreground">
            Colabore
          </p>
          <p className="max-w-xl text-sm text-muted-foreground">
            Organize ideias, acompanhe projetos e mantenha sua equipe alinhada
            em um só lugar.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <a
              href="mailto:contato@colabore.com"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              contato@colabore.com
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              Suporte
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 px-4 py-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Colabore. Todos os direitos reservados.</span>
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            Feito para equipes que colaboram com excelência.
          </span>
        </div>
      </div>
    </footer>
  );
};
