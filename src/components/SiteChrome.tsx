import { Link } from "@tanstack/react-router";
import { useState } from "react";

const nav = [
  { to: "/", label: "Início" },
  { to: "/artigos", label: "Artigos" },
  { to: "/fundamentos", label: "Fundamentos" },
  { to: "/laboratorio", label: "Laboratório" },
  { to: "/faq", label: "FAQ & Desafios" },
] as const;

export function Header() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md border border-flux/40 bg-flux/10 font-mono text-sm font-semibold text-flux">
            Φ
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-foreground">
              Fluxo &amp; Campo
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Indução eletromagnética
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-surface-2 text-foreground" }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-label="Abrir menu"
          className="rounded-md border border-border px-3 py-2 text-sm text-foreground md:hidden"
        >
          Menu
        </button>
      </div>

      {aberto ? (
        <nav className="border-t border-border/70 px-5 pb-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setAberto(false)}
              className="block border-b border-border/40 py-3 text-sm text-foreground/85 last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <p className="font-serif text-xl text-foreground">Fluxo &amp; Campo</p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Blog educativo sobre indução eletromagnética e suas aplicações tecnológicas. Conteúdo
          desenvolvido a partir das aulas de Física III — Aula 33 (Campo elétrico variável com o
          tempo) e Aula 34 (Indutores e indutância).
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-muted-foreground transition-colors hover:text-flux"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
