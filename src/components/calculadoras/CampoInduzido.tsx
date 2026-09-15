import { useState } from "react";
import { Campo, Painel, Resultado, fmt } from "@/components/Campo";
import { Formula } from "@/components/Formula";

const MU0 = 4 * Math.PI * 1e-7;

export function CalculadoraCampoInduzido() {
  const [nEspiras, setNEspiras] = useState(2000);
  const [i0, setI0] = useState(1.5);
  const [freq, setFreq] = useState(60);
  const [raioSol, setRaioSol] = useState(0.03);
  const [rSonda, setRSonda] = useState(0.05);

  const omega = 2 * Math.PI * freq;
  const amplitude = (r: number) =>
    r < raioSol
      ? (MU0 * nEspiras * i0 * omega * r) / 2
      : (MU0 * nEspiras * i0 * omega * raioSol * raioSol) / (2 * r);

  const eSonda = amplitude(rSonda);
  const eMax = amplitude(raioSol);
  const dBdtMax = MU0 * nEspiras * i0 * omega;

  const largura = 640;
  const altura = 220;
  const rMax = 0.16;
  const pontos = Array.from({ length: 161 }, (_, k) => {
    const r = (k / 160) * rMax;
    const x = (r / rMax) * largura;
    const y = altura - (amplitude(r) / (eMax || 1)) * (altura - 30) - 14;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const xSol = (raioSol / rMax) * largura;
  const xSonda = (rSonda / rMax) * largura;

  return (
    <Painel
      id="campo-induzido"
      titulo="Campo elétrico induzido dentro e fora de um solenoide"
      descricao="Um solenoide longo com n espiras por metro conduz i = I₀·cos(ωt). Explore a amplitude do campo elétrico induzido em função da distância ao eixo — inclusive na região externa, onde B é nulo."
    >
      <Formula latex="r<R:\; E=\frac{\mu_0 n I_0 \omega\, r}{2}\sin(\omega t) \qquad r>R:\; E=\frac{\mu_0 n I_0 \omega R^2}{2r}\sin(\omega t)" />

      <div className="grid gap-8 md:grid-cols-[320px_1fr]">
        <div className="space-y-5">
          <Campo label="Espiras por metro n" unidade="esp./m" valor={nEspiras} onChange={setNEspiras} min={100} max={10000} step={100} />
          <Campo label="Amplitude da corrente I₀" unidade="A" valor={i0} onChange={setI0} min={0.1} max={20} step={0.1} />
          <Campo label="Frequência f" unidade="Hz" valor={freq} onChange={setFreq} min={1} max={2000} step={1} />
          <Campo label="Raio do solenoide R" unidade="m" valor={raioSol} onChange={setRaioSol} min={0.005} max={0.1} step={0.005} />
          <Campo label="Distância da sonda r" unidade="m" valor={rSonda} onChange={setRSonda} min={0.002} max={0.16} step={0.002} />
          <div className="grid grid-cols-2 gap-3">
            <Resultado rotulo="E na sonda (amplitude)" valor={fmt(eSonda, 4)} unidade="V/m" destaque />
            <Resultado rotulo="E máximo (r = R)" valor={fmt(eMax, 4)} unidade="V/m" />
            <Resultado rotulo="|dB/dt| máximo" valor={fmt(dBdtMax, 3)} unidade="T/s" />
            <Resultado rotulo="Região" valor={rSonda < raioSol ? "interna" : "externa"} unidade="" />
          </div>
        </div>

        <figure className="rounded-lg border border-border bg-surface/60 p-4">
          <svg
            viewBox={`0 0 ${largura} ${altura}`}
            className="h-auto w-full"
            role="img"
            aria-label="Amplitude do campo elétrico induzido em função da distância ao eixo do solenoide"
          >
            <rect x="0" y="0" width={xSol} height={altura} className="fill-flux/5" />
            <line x1={xSol} x2={xSol} y1="0" y2={altura} stroke="var(--ember)" strokeDasharray="4 4" />
            <text x={xSol + 8} y="18" className="fill-ember font-mono text-[11px]">
              r = R
            </text>
            <polyline points={pontos} fill="none" stroke="var(--flux)" strokeWidth="2.5" />
            <line x1={xSonda} x2={xSonda} y1="0" y2={altura} stroke="currentColor" className="text-foreground/40" />
            <circle
              cx={xSonda}
              cy={altura - (eSonda / (eMax || 1)) * (altura - 30) - 14}
              r="5"
              fill="var(--ember)"
            />
          </svg>
          <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">
            Dentro do solenoide a amplitude cresce linearmente com r; fora, decai com 1/r. Mesmo na
            região externa, onde o campo magnético é praticamente nulo, existe campo elétrico
            induzido — o que importa é o fluxo abraçado pela curva, não o valor local de B.
          </figcaption>
        </figure>
      </div>
    </Painel>
  );
}
