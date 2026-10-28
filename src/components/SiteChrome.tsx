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
    <>
      {/* Barra superior de identificação para o professor */}
      <div className="bg-flux/10 border-b border-flux/20 px-5 py-1.5 text-center font-mono text-xs text-foreground/90">
        <span className="font-semibold text-flux">Aline Sayuri Hamawaki Kawamura</span> · Engenharia de Sistemas · UFMG · Matrícula: 2025430854
      </div>

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
    </>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="font-serif text-xl text-foreground">Fluxo &amp; Campo</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Blog educativo sobre indução eletromagnética e suas aplicações tecnológicas. Conteúdo
              desenvolvido a partir das aulas de Fundamentos de Eletromagnetismo — TP 20 (Indução Eletromagnética) - da Universidade Federal de Minas Gerais (UFMG).
            </p>
          </div>

          <div className="rounded-lg border border-border/60 bg-background/50 p-4 text-sm text-muted-foreground md:min-w-[280px]">
            <p className="font-semibold text-foreground">Aline Sayuri Hamawaki Kawamura</p>
            <p className="mt-1 text-xs">Engenharia de Sistemas · UFMG</p>
            <p className="mt-1 font-mono text-xs">Matrícula: 2025430854</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border/40 pt-6 text-sm">
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