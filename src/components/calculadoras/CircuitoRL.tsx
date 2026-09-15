import { useState } from "react";
import { Campo, Painel, Resultado, fmt } from "@/components/Campo";
import { Formula } from "@/components/Formula";

export function CalculadoraRL() {
  const [fem, setFem] = useState(12);
  const [r, setR] = useState(100);
  const [l, setL] = useState(50);

  const L = l / 1000;
  const tau = L / r;
  const iFinal = fem / r;
  const uFinal = 0.5 * L * iFinal * iFinal;

  const largura = 640;
  const altura = 220;
  const tMax = 5 * tau;
  const pontos = Array.from({ length: 121 }, (_, k) => {
    const t = (k / 120) * tMax;
    const i = iFinal * (1 - Math.exp(-t / tau));
    const x = (k / 120) * largura;
    const y = altura - (i / iFinal) * (altura - 24) - 12;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const yTau = altura - 0.632 * (altura - 24) - 12;

  return (
    <Painel
      id="rl"
      titulo="Circuito RL: resposta dinâmica"
      descricao="Ao fechar a chave, a corrente não salta ao valor final: a autoindução se opõe à variação. A constante de tempo τ = L/R governa toda a subida."
    >
      <Formula latex="\varepsilon - Ri - L\frac{di}{dt} = 0 \;\Longrightarrow\; i(t) = \frac{\varepsilon}{R}\left(1 - e^{-t/\tau}\right), \quad \tau = \frac{L}{R}" />

      <div className="grid gap-8 md:grid-cols-[320px_1fr]">
        <div className="space-y-5">
          <Campo label="Fem da fonte ε" unidade="V" valor={fem} onChange={setFem} min={1} max={240} step={1} />
          <Campo label="Resistência R" unidade="Ω" valor={r} onChange={setR} min={1} max={1000} step={1} />
          <Campo label="Indutância L" unidade="mH" valor={l} onChange={setL} min={1} max={2000} step={1} />
          <div className="grid grid-cols-2 gap-3">
            <Resultado rotulo="Constante τ" valor={fmt(tau * 1000, 4)} unidade="ms" destaque />
            <Resultado rotulo="Corrente final" valor={fmt(iFinal, 4)} unidade="A" />
            <Resultado rotulo="Energia no campo" valor={fmt(uFinal * 1000, 4)} unidade="mJ" />
            <Resultado rotulo="99% de i∞ em" valor={fmt(5 * tau * 1000, 3)} unidade="ms" />
          </div>
        </div>

        <figure className="rounded-lg border border-border bg-surface/60 p-4">
          <svg
            viewBox={`0 0 ${largura} ${altura}`}
            className="h-auto w-full"
            role="img"
            aria-label="Gráfico da corrente em função do tempo num circuito RL"
          >
            {[0.25, 0.5, 0.75].map((f) => (
              <line
                key={f}
                x1="0"
                x2={largura}
                y1={altura - f * (altura - 24) - 12}
                y2={altura - f * (altura - 24) - 12}
                stroke="currentColor"
                className="text-border"
                strokeDasharray="3 5"
              />
            ))}
            <line
              x1={largura / 5}
              x2={largura / 5}
              y1="0"
              y2={altura}
              stroke="currentColor"
              className="text-ember/60"
              strokeDasharray="4 4"
            />
            <polyline
              points={pontos}
              fill="none"
              stroke="var(--flux)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx={largura / 5} cy={yTau} r="4" fill="var(--ember)" />
            <text x={largura / 5 + 10} y={yTau - 8} className="fill-ember font-mono text-[11px]">
              t = τ → 63,2%
            </text>
          </svg>
          <figcaption className="mt-3 text-xs text-muted-foreground">
            Eixo horizontal: 0 a 5τ ({fmt(5 * tau * 1000, 3)} ms). Eixo vertical: corrente de 0 a{" "}
            {fmt(iFinal, 3)} A.
          </figcaption>
        </figure>
      </div>
    </Painel>
  );
}
