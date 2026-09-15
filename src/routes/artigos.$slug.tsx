import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { artigos, getArtigo } from "@/data/artigos";
import { Blocos } from "@/components/Blocos";

export const Route = createFileRoute("/artigos/$slug")({
  loader: ({ params }) => {
    const artigo = getArtigo(params.slug);
    if (!artigo) throw notFound();
    return { artigo };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Artigo indisponível — Fluxo & Campo" }, { name: "robots", content: "noindex" }],
      };
    }
    const { artigo } = loaderData;
    return {
      meta: [
        { title: `${artigo.titulo} — Fluxo & Campo` },
        { name: "description", content: artigo.resumo },
        { property: "og:title", content: artigo.titulo },
        { property: "og:description", content: artigo.resumo },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: PaginaArtigo,
});

function PaginaArtigo() {
  const { artigo } = Route.useLoaderData();
  const indice = artigos.findIndex((a) => a.slug === artigo.slug);
  const proximo = artigos[(indice + 1) % artigos.length];

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link to="/artigos" className="font-mono text-xs text-flux hover:underline">
        ← Todos os artigos
      </Link>

      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {artigo.categoria} · leitura de {artigo.leitura}
      </p>
      <h1 className="mt-4 text-balance-tight text-4xl font-semibold leading-[1.15] text-foreground md:text-5xl">
        {artigo.titulo}
      </h1>
      <p className="mt-5 text-lg leading-8 text-foreground/75">{artigo.resumo}</p>

      <Blocos blocos={artigo.blocos} />

      <div className="mt-16 border-t border-border/70 pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Próxima leitura
        </p>
        <Link
          to="/artigos/$slug"
          params={{ slug: proximo.slug }}
          className="mt-3 block font-serif text-2xl font-semibold text-foreground hover:text-flux"
        >
          {proximo.titulo}
        </Link>
      </div>
    </article>
  );
}
