import { createFileRoute, Link } from "@tanstack/react-router";
import { artigos } from "@/data/artigos";

export const Route = createFileRoute("/artigos")({
  head: () => ({
    meta: [
      { title: "Artigos sobre indução eletromagnética — Fluxo & Campo" },
      {
        name: "description",
        content:
          "Dez artigos aprofundados: transformadores, geradores, motores de indução, cooktop, carregamento sem fio, freios magnéticos, sensores, campo induzido e correntes de Foucault.",
      },
      { property: "og:title", content: "Artigos sobre indução eletromagnética" },
      {
        property: "og:description",
        content: "Aplicações tecnológicas e fundamentos da indução eletromagnética, explicados a fundo.",
      },
    ],
  }),
  component: ListaArtigos,
});

function ListaArtigos() {
  const aplicacoes = artigos.filter((a) => !a.categoria.startsWith("Fundamento"));
  const fundamentos = artigos.filter((a) => a.categoria.startsWith("Fundamento"));

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-flux">Biblioteca</p>
      <h1 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">Todos os artigos</h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
        Comece pelas aplicações tecnológicas ou vá direto aos fundamentos teóricos. Cada texto traz
        a física completa, sem atalhos.
      </p>

      <Secao titulo="Aplicações tecnológicas" itens={aplicacoes} />
      <Secao titulo="Fundamentos teóricos" itens={fundamentos} />
    </div>
  );
}

function Secao({ titulo, itens }: { titulo: string; itens: typeof artigos }) {
  return (
    <section className="mt-14">
      <h2 className="border-b border-border/70 pb-3 text-2xl font-semibold text-foreground">
        {titulo}
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {itens.map((artigo) => (
          <Link
            key={artigo.slug}
            to="/artigos/$slug"
            params={{ slug: artigo.slug }}
            className="group flex gap-5 rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-flux/50"
          >
            <span className="text-2xl" aria-hidden>
              {artigo.icone}
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {artigo.categoria} · {artigo.leitura}
              </span>
              <span className="mt-2 block font-serif text-xl font-semibold leading-snug text-foreground group-hover:text-flux">
                {artigo.titulo}
              </span>
              <span className="mt-3 block text-sm leading-7 text-muted-foreground">
                {artigo.resumo}
              </span>
              <span className="mt-4 inline-block rounded border border-flux/30 bg-flux/10 px-2 py-1 font-mono text-xs text-flux">
                {artigo.destaque}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
