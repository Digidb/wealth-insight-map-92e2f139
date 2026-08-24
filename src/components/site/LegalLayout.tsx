import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import logo from "@/assets/logo-la-new.png";

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
          <Link to="/">
            <img
              src={logo}
              alt="Logo Lamyae Ayoub — Gestion de patrimoine"
              className="h-12 w-auto"
            />
          </Link>
          <Link to="/" className="text-sm font-semibold text-navy-deep hover:text-gold">
            Retour au site
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl text-navy-deep sm:text-4xl">{title}</h1>
        <div className="mt-10 space-y-5 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:text-navy-deep [&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-navy-deep [&_li]:mb-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          {children}
        </div>
      </article>
      <footer className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-4xl px-6 py-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lamyae Ayoub — n° ORIAS 26000052.
        </div>
      </footer>
    </main>
  );
}
