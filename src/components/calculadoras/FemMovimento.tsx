import { useState } from "react";
import { Campo, Painel, Resultado, fmt } from "@/components/Campo";
import { Formula } from "@/components/Formula";

export function CalculadoraFemMovimento() {
  const [b, setB] = useState(0.8);
  const [comprimento, setComprimento] = useState(0.25);
  const [v, setV] = useState(4);
  const [r, setR] = useState(0.5);

  const fem = b * comprimento * v;
  const i = fem / r;
  const forca = b * i * comprimento;
  const potencia = forca * v;
  const largura = 640;
  const altura = 200;
  const xBarra = 120 + Math.min(v / 10, 1) * 300;

  return (
    <Painel
      id="fem-movimento"
      titulo="Fem de movimento e os dois observadores"
      descricao="Uma barra de comprimento l desliza com velocidade v sobre trilhos, dentro de um campo magnético B perpendicular. Veja a fem gerada e a força de oposição que aparece imediatamente."
    >
      <Formula latex="\varepsilon = B\,l\,v \qquad i = \frac{\varepsilon}{R} \qquad F = B\,i\,l" />

      <div className="grid gap-8 md:grid-cols-[320px_1fr]">
        <div className="space-y-5">
          <Campo label="Campo magnético B" unidade="T" valor={b} onChange={setB} min={0.05} max={3} step={0.05} />
          <Campo label="Comprimento da barra l" unidade="m" valor={comprimento} onChange={setComprimento} min={0.05} max={1} step={0.05} />
          <Campo label="Velocidade v" unidade="m/s" valor={v} onChange={setV} min={0.1} max={10} step={0.1} />
          <Campo label="Resistência do circuito R" unidade="Ω" valor={r} onChange={setR} min={0.1} max={10} step={0.1} />
          <div className="grid grid-cols-2 gap-3">
            <Resultado rotulo="Fem induzida" valor={fmt(fem, 4)} unidade="V" destaque />
            <Resultado rotulo="Corrente" valor={fmt(i, 3)} unidade="A" />
            <Resultado rotulo="Força de oposição" valor={fmt(forca, 3)} unidade="N" />
            <Resultado rotulo="Potência dissipada" valor={fmt(potencia, 3)} unidade="W" />
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            A potência mecânica necessária para manter a barra em movimento é exatamente igual à
            potência dissipada no resistor: a lei de Lenz é conservação de energia em ação.
          </p>
        </div>

        <div className="space-y-4">
          <figure className="rounded-lg border border-border bg-surface/60 p-4">
            <svg viewBox={`0 0 ${largura} ${altura}`} className="h-auto w-full" role="img" aria-label="Barra condutora deslizando sobre trilhos dentro de um campo magnético">
              {Array.from({ length: 7 }, (_, row) =>
                Array.from({ length: 12 }, (_, col) => (
                  <g key={`${row}-${col}`}>
                    <circle cx={40 + col * 50} cy={25 + row * 25} r="6" className="fill-none stroke-flux/30" strokeWidth="1" />
                    <line x1={36 + col * 50} y1={21 + row * 25} x2={44 + col * 50} y2={29 + row * 25} className="stroke-flux/30" />
                    <line x1={44 + col * 50} y1={21 + row * 25} x2={36 + col * 50} y2={29 + row * 25} className="stroke-flux/30" />
                  </g>
                )),
              )}
              <line x1="60" y1="50" x2={largura - 40} y2="50" stroke="var(--ember)" strokeWidth="3" />
              <line x1="60" y1="160" x2={largura - 40} y2="160" stroke="var(--ember)" strokeWidth="3" />
              <line x1="60" y1="50" x2="60" y2="160" stroke="var(--ember)" strokeWidth="3" />
              <line x1={xBarra} y1="42" x2={xBarra} y2="168" stroke="var(--flux)" strokeWidth="6" strokeLinecap="round" />
              <line x1={xBarra + 12} y1="105" x2={xBarra + 52} y2="105" stroke="var(--flux)" strokeWidth="2" markerEnd="url(#seta)" />
              <text x={xBarra + 16} y="95" className="fill-flux font-mono text-[12px]">v</text>
              <text x="70" y="105" className="fill-ember font-mono text-[12px]">R</text>
              <text x={largura - 130} y="188" className="fill-muted-foreground font-mono text-[11px]">B entrando na tela</text>
              <defs>
                <marker id="seta" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 z" fill="var(--flux)" />
                </marker>
              </defs>
            </svg>
          </figure>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-flux">
                Observador S — parado com o ímã
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/85">
                Vê as cargas se movendo junto com a barra e atribui a corrente à força magnética
                q·v × B. Não há campo elétrico para ele.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
                Observador S′ — parado com o circuito
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/85">
                Não vê deslocamento lateral das cargas; explica a corrente postulando um campo
                elétrico induzido E ao longo da barra. Mede a mesma fem, {fmt(fem, 3)} V.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Painel>
  );
}
