import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Formula } from "@/components/Formula";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Perguntas frequentes e desafios de indução — Fluxo & Campo" },
      {
        name: "description",
        content:
          "Dúvidas comuns sobre indução eletromagnética e exercícios conceituais com resposta comentada, da lei de Lenz às correntes de Foucault.",
      },
      { property: "og:title", content: "FAQ e desafios sobre indução eletromagnética" },
      {
        property: "og:description",
        content: "Perguntas frequentes e exercícios conceituais com solução comentada para estudantes.",
      },
    ],
  }),
  component: Faq,
});

const perguntas = [
  {
    q: "Por que a fem depende da variação do fluxo, e não do valor do fluxo?",
    a: "Porque a lei de Faraday envolve uma derivada temporal. Um ímã parado ao lado de uma bobina produz fluxo grande e fem nula. Se ele se move, ainda que o fluxo seja pequeno, há fem. O que gera campo elétrico é a taxa de variação dΦ/dt.",
  },
  {
    q: "Um transformador funciona com pilha?",
    a: "Não, exceto no instante em que se liga ou desliga. Corrente contínua estabelece fluxo constante, dΦ/dt = 0 e nada é induzido no secundário. É por isso que a rede elétrica é em corrente alternada.",
  },
  {
    q: "Por que o campo elétrico induzido não tem potencial?",
    a: "Porque sua integral ao longo de uma curva fechada vale −dΦ/dt, que é diferente de zero. Num campo conservativo essa integral é sempre nula, o que garante que a diferença de potencial não dependa do caminho. Sem essa propriedade, não faz sentido definir V.",
  },
  {
    q: "Por que os núcleos de transformadores são laminados?",
    a: "Para quebrar os caminhos das correntes de Foucault. Lâminas finas isoladas entre si mantêm o caminho magnético, mas confinam os laços de corrente a fatias estreitas, reduzindo drasticamente a dissipação Joule no ferro.",
  },
  {
    q: "Por que panela de alumínio não esquenta no cooktop de indução?",
    a: "Alumínio tem permeabilidade próxima à do vácuo e baixa resistividade: acopla mal com a bobina e dissipa pouco. O teste caseiro é o ímã — se gruda no fundo, a panela funciona.",
  },
  {
    q: "A lei de Lenz viola a conservação de energia?",
    a: "Ao contrário: ela é uma consequência dela. Se a corrente induzida reforçasse a variação que a criou, teríamos realimentação positiva e energia surgindo do nada. O sinal negativo garante que é preciso trabalho mecânico para gerar eletricidade.",
  },
  {
    q: "Dois observadores discordam sobre a física do fenômeno?",
    a: "Discordam sobre a origem da força, não sobre o resultado. Um atribui a corrente à força magnética qv × B, outro a um campo elétrico induzido. A força total por unidade de carga, E + v × B, é a mesma, e ambos medem a mesma fem.",
  },
  {
    q: "Por que a indutância cresce com o quadrado do número de espiras?",
    a: "O campo dentro do solenoide é proporcional a N, e o fluxo concatenado soma a contribuição de cada uma das N espiras. Duas multiplicações por N resultam em N².",
  },
];

const desafios = [
  {
    titulo: "Desafio 1 — Fluxo num solenoide",
    enunciado:
      "Um solenoide de 5 cm de comprimento e raio 0,5 cm tem 100 espiras por centímetro e é percorrido por 2 A. Calcule o fluxo concatenado.",
    dica: "Use n = 10⁴ esp./m, A = πR² e Φ = μ₀ n² V i, com V = A·H.",
    solucao:
      "A = π(0,005)² = 7,85×10⁻⁵ m²; V = 7,85×10⁻⁵ × 0,05 = 3,93×10⁻⁶ m³. L = μ₀n²V = 4π×10⁻⁷ × 10⁸ × 3,93×10⁻⁶ ≈ 4,9×10⁻⁴ H. O fluxo concatenado é Φ = L·i ≈ 9,9×10⁻⁴ Wb.",
  },
  {
    titulo: "Desafio 2 — Indutância a partir do fluxo",
    enunciado:
      "Uma bobina compacta tem 300 espiras e indutância de 9,0 mH. Percorrida por 6,0 mA, qual é o fluxo magnético em cada espira?",
    dica: "O fluxo concatenado é N·φ = L·i.",
    solucao:
      "N·φ = L·i = 9,0×10⁻³ × 6,0×10⁻³ = 5,4×10⁻⁵ Wb. Por espira: φ = 5,4×10⁻⁵ / 300 = 1,8×10⁻⁷ Wb.",
  },
  {
    titulo: "Desafio 3 — Energia armazenada",
    enunciado:
      "Qual indutância é necessária para armazenar 0,6 kW·h de energia numa bobina que conduz 120 A?",
    dica: "Converta a energia para joules: 1 kW·h = 3,6×10⁶ J. Depois isole L em U = ½Li².",
    solucao:
      "U = 0,6 × 3,6×10⁶ = 2,16×10⁶ J. L = 2U/i² = 2×2,16×10⁶ / 14400 = 300 H. Um valor enorme — por isso energia magnética não é usada para armazenamento em larga escala, exceto em sistemas supercondutores.",
  },
  {
    titulo: "Desafio 4 — Densidade de energia",
    enunciado: "Calcule a densidade de energia entre os polos de um eletroímã que produz 5,8 T.",
    dica: "u = B²/2μ₀.",
    solucao:
      "u = (5,8)² / (2 × 4π×10⁻⁷) = 33,64 / 2,513×10⁻⁶ ≈ 1,34×10⁷ J/m³. Mais de 13 megajoules por metro cúbico apenas no campo.",
  },
  {
    titulo: "Desafio 5 — Campo induzido fora do solenoide",
    enunciado:
      "Fora de um solenoide longo o campo magnético é praticamente nulo. Existe campo elétrico induzido nessa região quando a corrente varia? Justifique.",
    dica: "Aplique ∮E·dl a uma circunferência de raio r > R e pense no fluxo que ela abraça.",
    solucao:
      "Sim. A circunferência externa abraça todo o fluxo do interior do solenoide, então ∮E·dl = −dΦ/dt ≠ 0. O resultado é E = μ₀nI₀ωR²/(2r)·sen(ωt), que decai com 1/r. O campo elétrico depende do fluxo abraçado, não do valor local de B.",
  },
  {
    titulo: "Desafio 6 — Placa freando",
    enunciado:
      "Uma placa metálica sai de uma região de campo magnético. Analise os quatro lados do laço de corrente induzida e mostre que a força resultante se opõe ao movimento.",
    dica: "Quanto vale i·L × B no lado que já está fora do campo?",
    solucao:
      "O lado ainda imerso no campo sofre força i·L × B contrária ao movimento. O lado oposto está em região com B = 0 e não sofre força. Os dois lados transversais sofrem forças de mesmo módulo e sentidos opostos, que se cancelam. Sobra a força de frenagem — e o trabalho contra ela vira calor Joule na placa.",
  },
  {
    titulo: "Desafio 7 — Fem média por desligamento",
    enunciado:
      "Um solenoide longo de seção 8,0 cm² tem 90 espiras por metro e conduz 0,350 A. Um enrolamento secundário de 12 espiras o circunda. A corrente é desligada em 0,040 s. Qual a fem média induzida no secundário?",
    dica: "B = μ₀ni; ε = N·A·ΔB/Δt.",
    solucao:
      "B = 4π×10⁻⁷ × 90 × 0,350 = 3,96×10⁻⁵ T. Φ = B·A = 3,96×10⁻⁵ × 8,0×10⁻⁴ = 3,17×10⁻⁸ Wb. ε = 12 × 3,17×10⁻⁸ / 0,040 ≈ 9,5×10⁻⁶ V.",
  },
  {
    titulo: "Desafio 8 — Anel entre ímãs",
    enunciado:
      "Um anel metálico de raio 4,50 cm está num campo uniforme que diminui a 0,250 T/s. Qual o módulo do campo elétrico induzido no anel?",
    dica: "Use E = (r/2)·|dB/dt|.",
    solucao:
      "E = (0,045/2) × 0,250 = 5,6×10⁻³ V/m. O sentido é tal que a corrente induzida tenta manter o fluxo original — pela lei de Lenz, anti-horário visto do lado para onde o campo aponta.",
  },
];

function Faq() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-flux">Estudo</p>
      <h1 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">
        Perguntas frequentes e desafios
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
        Primeiro as dúvidas que todo estudante tem. Depois, oito exercícios conceituais e numéricos
        com solução comentada — tente antes de abrir.
      </p>

      <section className="mt-14">
        <h2 className="border-b border-border/70 pb-3 text-2xl font-semibold text-foreground">
          Perguntas frequentes
        </h2>
        <div className="mt-6 space-y-3">
          {perguntas.map((p) => (
            <details
              key={p.q}
              className="group rounded-lg border border-border bg-card/60 px-5 py-4 open:border-flux/40"
            >
              <summary className="cursor-pointer list-none text-[1.0625rem] font-medium text-foreground marker:hidden">
                <span className="mr-3 font-mono text-flux">+</span>
                {p.q}
              </summary>
              <p className="mt-4 border-t border-border/60 pt-4 text-[1rem] leading-8 text-foreground/80">
                {p.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="border-b border-border/70 pb-3 text-2xl font-semibold text-foreground">
          Desafios para estudantes
        </h2>
        <div className="mt-6 space-y-4">
          {desafios.map((d) => (
            <Desafio key={d.titulo} {...d} />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-xl border border-border bg-surface/50 p-8">
        <h2 className="text-2xl font-semibold text-foreground">Constantes úteis</h2>
        <div className="mt-6">
          <Formula latex="\mu_0 = 4\pi\times10^{-7}\,\mathrm{T\cdot m/A} = 1{,}257\times10^{-6}\,\mathrm{H/m} \qquad 1\,\mathrm{H} = 1\,\mathrm{Wb/A} \qquad 1\,\mathrm{kW\cdot h} = 3{,}6\times10^{6}\,\mathrm{J}" />
        </div>
      </section>
    </div>
  );
}

function Desafio({
  titulo,
  enunciado,
  dica,
  solucao,
}: {
  titulo: string;
  enunciado: string;
  dica: string;
  solucao: string;
}) {
  const [verSolucao, setVerSolucao] = useState(false);
  const [verDica, setVerDica] = useState(false);

  return (
    <article className="rounded-xl border border-border bg-card/60 p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">{titulo}</p>
      <p className="mt-3 text-[1.0625rem] leading-8 text-foreground/85">{enunciado}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setVerDica((v) => !v)}
          className="rounded-md border border-border px-3 py-2 text-sm text-foreground/85 transition-colors hover:border-flux/50 hover:text-flux"
        >
          {verDica ? "Esconder dica" : "Ver dica"}
        </button>
        <button
          type="button"
          onClick={() => setVerSolucao((v) => !v)}
          className="rounded-md bg-flux/15 px-3 py-2 text-sm text-flux transition-colors hover:bg-flux/25"
        >
          {verSolucao ? "Esconder solução" : "Ver solução"}
        </button>
      </div>

      {verDica ? (
        <p className="mt-4 rounded-md border border-border bg-surface/60 px-4 py-3 text-sm leading-7 text-muted-foreground">
          {dica}
        </p>
      ) : null}
      {verSolucao ? (
        <p className="mt-3 rounded-md border border-flux/30 bg-flux/10 px-4 py-4 text-sm leading-7 text-foreground/85">
          {solucao}
        </p>
      ) : null}
    </article>
  );
}
