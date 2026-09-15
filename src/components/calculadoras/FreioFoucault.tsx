import { useState } from "react";
import { Campo, Painel, Resultado, fmt } from "@/components/Campo";
import { Formula } from "@/components/Formula";

export function SimuladorFoucault() {
  const [b, setB] = useState(0.6);
  const [v0, setV0] = useState(20);
  const [massa, setMassa] = useState(600);
  const [k, setK] = useState(4);
  const [laminas, setLaminas] = useState(1);

  const coef = k * b * b;
  const tau = massa / coef;
  const forca0 = coef * v0;

  const largura = 640;
  const altura = 200;
  const tMax = 4 * tau;
  const pontos = Array.from({ length: 121 }, (_, idx) => {
    const t = (idx / 120) * tMax;
    const v = v0 * Math.exp(-t / tau);
    return `${((idx / 120) * largura).toFixed(1)},${(altura - (v / v0) * (altura - 24) - 12).toFixed(1)}`;
  }).join(" ");

  const perdaRelativa = 1 / (laminas * laminas);

  return (
    <Painel
      id="foucault"
      titulo="Freio de Foucault e o efeito da laminação"
      descricao="A força de frenagem é proporcional à velocidade, o que produz uma desaceleração exponencial. O segundo controle mostra por que núcleos laminados reduzem tanto a perda por correntes parasitas."
    >
      <Formula latex="F = -k\,B^2 v \;\Longrightarrow\; v(t) = v_0\,e^{-t/\tau}, \quad \tau = \frac{m}{kB^2}" />

      <div className="grid gap-8 md:grid-cols-[320px_1fr]">
        <div className="space-y-5">
          <Campo label="Campo magnético B" unidade="T" valor={b} onChange={setB} min={0.05} max={2} step={0.05} />
          <Campo label="Velocidade inicial v₀" unidade="m/s" valor={v0} onChange={setV0} min={1} max={80} step={1} />
          <Campo label="Massa do veículo m" unidade="kg" valor={massa} onChange={setMassa} min={50} max={5000} step={50} />
          <Campo label="Fator geométrico/condutivo k" unidade="kg·s⁻¹·T⁻²" valor={k} onChange={setK} min={0.5} max={50} step={0.5} />
          <div className="grid grid-cols-2 gap-3">
            <Resultado rotulo="Constante τ" valor={fmt(tau, 3)} unidade="s" destaque />
            <Resultado rotulo="Força inicial" valor={fmt(forca0, 2)} unidade="N" />
            <Resultado rotulo="v após 1 τ" valor={fmt(v0 * Math.exp(-1), 3)} unidade="m/s" />
            <Resultado rotulo="Energia dissipada" valor={fmt(0.5 * massa * v0 * v0 / 1000, 2)} unidade="kJ" />
          </div>
        </div>

        <div className="space-y-4">
          <figure className="rounded-lg border border-border bg-surface/60 p-4">
            <svg viewBox={`0 0 ${largura} ${altura}`} className="h-auto w-full" role="img" aria-label="Velocidade em função do tempo sob frenagem magnética">
              <polyline points={pontos} fill="none" stroke="var(--flux)" strokeWidth="2.5" />
              <line x1="0" x2={largura} y1={altura - 12} y2={altura - 12} className="stroke-border" />
            </svg>
            <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">
              A velocidade se aproxima de zero assintoticamente: o freio magnético puro nunca
              imobiliza o veículo, por isso é sempre combinado com freio mecânico.
            </figcaption>
          </figure>

          <div className="rounded-lg border border-border bg-surface/60 p-4">
            <Campo
              label="Número de lâminas do núcleo"
              unidade="lâminas"
              valor={laminas}
              onChange={setLaminas}
              min={1}
              max={40}
              step={1}
            />
            <div className="mt-4 flex h-16 gap-[3px]">
              {Array.from({ length: laminas }, (_, idx) => (
                <div key={idx} className="h-full flex-1 rounded-sm bg-flux/25 ring-1 ring-flux/40" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Dividindo o núcleo maciço em {laminas}{" "}
              {laminas === 1 ? "peça única" : "lâminas isoladas entre si"}, a perda por correntes de
              Foucault cai para aproximadamente{" "}
              <span className="font-mono text-flux">{fmt(perdaRelativa * 100, 2)}%</span> do valor
              original — a dissipação escala com o quadrado da espessura de cada fatia.
            </p>
          </div>
        </div>
      </div>
    </Painel>
  );
}
