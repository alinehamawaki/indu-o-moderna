import { createFileRoute, Link } from "@tanstack/react-router";
import { artigos } from "@/data/artigos";
import { Formula } from "@/components/Formula";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fluxo & Campo — Indução eletromagnética e suas aplicações" },
      {
        name: "description",
        content:
          "Artigos aprofundados, fundamentos físicos e simuladores interativos sobre indução eletromagnética: transformadores, geradores, motores, cooktops e carregamento sem fio.",
      },
      { property: "og:title", content: "Fluxo & Campo — Indução eletromagnética aplicada" },
      {
        property: "og:description",
        content:
          "Da lei de Faraday-Neumann-Lenz às tecnologias do dia a dia, com calculadoras interativas e fórmulas bem formatadas.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const destaques = artigos.slice(0, 3);
  const fundamentos = artigos.filter((a) => a.categoria.startsWith("Fundamento"));

  return (
    <>
      <section className="grid-bg border-b border-border/70">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-flux">
            Fundamentos de Eletromagnetismo - UFMG
          </p>
          <h1 className="mt-5 max-w-4xl text-balance-tight text-4xl font-semibold leading-[1.1] text-foreground md:text-6xl">
            Indução eletromagnética e suas aplicações
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/80">
            Produção de conteúdo para a disciplina de Fundamentos de Eletromagnetismo - UFMG sobre indução eletromagnética: do campo elétrico induzido não
            conservativo às usinas, motores, cooktops e carregadores sem fio.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/artigos"
              className="rounded-md bg-flux px-5 py-3 text-sm font-medium text-flux-foreground transition-opacity hover:opacity-90"
            >
              Ler os artigos
            </Link>
            <Link
              to="/laboratorio"
              className="rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Abrir o laboratório interativo
            </Link>
          </div>

          <div className="mt-14 max-w-2xl">
            <Formula
              latex="\varepsilon = \oint \vec{E}\cdot d\vec{l} = -\frac{d\Phi_B}{dt}"
              legenda="Lei de Faraday-Neumann-Lenz"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "\\varepsilon = -\\frac{d\\Phi_B}{dt}", d: "Fem induzida pela taxa de variação do fluxo" },
            { k: "L = \\mu_0 n^2 V", d: "Autoindutância de um solenoide ideal" },
            { k: "u = \\frac{B^2}{2\\mu_0}", d: "Densidade de energia no campo magnético" },
            { k: "\\frac{F}{q} = E + \\mathbf{v} \\times \\mathbf{B}", d: "A força que todos os observadores concordam" },
          ].map((item) => (
            <div key={item.d} className="rounded-lg border border-border bg-card/60 p-5">
              <Formula latex={item.k} />
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="flex items-end justify-between gap-6 border-b border-border/70 pb-4">
          <h2 className="text-3xl font-semibold text-foreground">Aplicações em destaque</h2>
          <Link to="/artigos" className="text-sm text-flux hover:underline">
            Ver todos os {artigos.length} artigos →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {destaques.map((artigo) => (
            <Link
              key={artigo.slug}
              to="/artigos/$slug"
              params={{ slug: artigo.slug }}
              className="group flex flex-col rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-flux/50"
            >
              <span className="text-2xl" aria-hidden>
                {artigo.icone}
              </span>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {artigo.categoria} · {artigo.leitura}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-snug text-foreground group-hover:text-flux">
                {artigo.titulo}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{artigo.resumo}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Seção unificada: Base teórica e Fundamentos físicos */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-xl border border-border bg-surface/50 p-8 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-ember">
                Fundamentos físicos e base teórica
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                Campo elétrico variável com o tempo e indutância
              </h2>
            </div>
            <Link
              to="/fundamentos"
              className="inline-flex items-center text-sm font-medium text-ember hover:underline"
            >
              Ver página completa de fundamentos físicos →
            </Link>
          </div>

          <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/80">
            Faraday-Neumann-Lenz, autoindutância, indutância mútua, energia no campo magnético e
            circuitos RL. O campo elétrico induzido existe mesmo no vácuo, tem linhas de força
            fechadas e não admite potencial escalar — compreenda as deduções fundamentais.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {fundamentos.map((a) => (
              <Link
                key={a.slug}
                to="/artigos/$slug"
                params={{ slug: a.slug }}
                className="rounded-lg border border-border bg-background/40 p-5 transition-colors hover:border-ember/50"
              >
                <p className="font-mono text-sm text-ember">{a.destaque}</p>
                <p className="mt-3 font-serif text-lg leading-snug text-foreground">{a.titulo}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-5 md:grid-cols-1">
          <Link
            to="/faq"
            className="rounded-xl border border-border bg-card/60 p-8 transition-colors hover:border-flux/50"
          >
            <h2 className="text-2xl font-semibold text-foreground">FAQ e desafios</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Perguntas frequentes e exercícios conceituais com resposta comentada para testar de
              verdade o seu entendimento.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}