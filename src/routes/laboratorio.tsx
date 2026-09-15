import { createFileRoute } from "@tanstack/react-router";
import { CalculadoraTransformador } from "@/components/calculadoras/Transformador";
import { CalculadoraSolenoide } from "@/components/calculadoras/Solenoide";
import { CalculadoraRL } from "@/components/calculadoras/CircuitoRL";
import { CalculadoraCampoInduzido } from "@/components/calculadoras/CampoInduzido";
import { CalculadoraFemMovimento } from "@/components/calculadoras/FemMovimento";
import { SimuladorFoucault } from "@/components/calculadoras/FreioFoucault";

export const Route = createFileRoute("/laboratorio")({
  head: () => ({
    meta: [
      { title: "Laboratório interativo de indução — Fluxo & Campo" },
      {
        name: "description",
        content:
          "Seis simuladores: relação de espiras do transformador, indutância e energia de solenoide, circuito RL, campo elétrico induzido, fem de movimento e freio de Foucault.",
      },
      { property: "og:title", content: "Laboratório interativo de indução eletromagnética" },
      {
        property: "og:description",
        content: "Calculadoras e visualizações para explorar a física da indução na prática.",
      },
    ],
  }),
  component: Laboratorio,
});

const atalhos = [
  { id: "transformador", label: "Transformador" },
  { id: "solenoide", label: "Solenoide e energia" },
  { id: "rl", label: "Circuito RL" },
  { id: "campo-induzido", label: "Campo E induzido" },
  { id: "fem-movimento", label: "Fem de movimento" },
  { id: "foucault", label: "Freio de Foucault" },
];

function Laboratorio() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-flux">Interativo</p>
      <h1 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">
        Laboratório de indução
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
        Mexa nos controles e veja as grandezas responderem em tempo real. Todos os modelos usam as
        equações exatas apresentadas nos artigos — nada é aproximado por conveniência.
      </p>

      <nav className="mt-8 flex flex-wrap gap-2">
        {atalhos.map((a) => (
          <a
            key={a.id}
            href={`#${a.id}`}
            className="rounded-md border border-border bg-surface/60 px-3 py-2 text-sm text-foreground/85 transition-colors hover:border-flux/50 hover:text-flux"
          >
            {a.label}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-8">
        <CalculadoraTransformador />
        <CalculadoraSolenoide />
        <CalculadoraRL />
        <CalculadoraCampoInduzido />
        <CalculadoraFemMovimento />
        <SimuladorFoucault />
      </div>
    </div>
  );
}
