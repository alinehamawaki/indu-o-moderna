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
            Física III · Aulas 33 e 34
          </p>
          <h1 className="mt-5 max-w-4xl text-balance-tight text-4xl font-semibold leading-[1.1] text-foreground md:text-6xl">
            A variação do fluxo magnético move o mundo moderno
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/80">
            Um blog educativo sobre indução eletromagnética: do campo elétrico induzido não
            conservativo às usinas, motores, cooktops e carregadores sem fio. Teoria rigorosa,
            linguagem clara e simuladores para brincar com os números.
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
              legenda="Lei de Faraday-Neumann-Lenz: a única equação de que você precisa para entender tudo o que vem a seguir."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "ε = −dΦ/dt", d: "Fem induzida pela taxa de variação do fluxo" },
            { k: "L = μ₀n²V", d: "Autoindutância de um solenoide ideal" },
            { k: "u = B²/2μ₀", d: "Densidade de energia no campo magnético" },
            { k: "F/q = E + v×B", d: "A força que todos os observadores concordam" },
          ].map((item) => (
            <div key={item.k} className="rounded-lg border border-border bg-card/60 p-5">
              <p className="font-mono text-base text-flux">{item.k}</p>
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

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-xl border border-border bg-surface/50 p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-ember">
            Base teórica — Aula 33
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-foreground">
            Campo elétrico variável com o tempo
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/80">
            O campo elétrico induzido existe mesmo no vácuo, tem linhas de força fechadas e não
            admite potencial escalar. Entender isso é o que separa decorar a lei de Faraday de
            realmente compreendê-la.
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

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="grid gap-5 md:grid-cols-2">
          <Link
            to="/fundamentos"
            className="rounded-xl border border-border bg-card/60 p-8 transition-colors hover:border-flux/50"
          >
            <h2 className="text-2xl font-semibold text-foreground">Fundamentos físicos</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Faraday-Neumann-Lenz, autoindutância e indutância mútua, energia no campo magnético e
              circuitos RL — com todas as deduções.
            </p>
          </Link>
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
