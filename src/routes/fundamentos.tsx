import { createFileRoute, Link } from "@tanstack/react-router";
import { Formula } from "@/components/Formula";

export const Route = createFileRoute("/fundamentos")({
  head: () => ({
    meta: [
      { title: "Fundamentos físicos da indução eletromagnética — Fluxo & Campo" },
      {
        name: "description",
        content:
          "Lei de Faraday-Neumann-Lenz, autoindutância e indutância mútua, energia e densidade de energia no campo magnético e circuitos RL, com deduções completas.",
      },
      { property: "og:title", content: "Fundamentos físicos da indução eletromagnética" },
      {
        property: "og:description",
        content: "As quatro bases teóricas que sustentam toda aplicação de indução, deduzidas passo a passo.",
      },
    ],
  }),
  component: Fundamentos,
});

const secoes = [
  { id: "faraday", label: "Faraday-Neumann-Lenz" },
  { id: "indutancia", label: "Indutância" },
  { id: "energia", label: "Energia no campo" },
  { id: "rl", label: "Circuitos RL" },
];

function Fundamentos() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-flux">Teoria</p>
      <h1 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">
        Fundamentação física
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
        Quatro pilares sustentam todas as aplicações tratadas neste blog. Aqui eles aparecem com as
        deduções completas, na mesma sequência das aulas.
      </p>

      <nav className="mt-8 flex flex-wrap gap-2">
        {secoes.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-md border border-border bg-surface/60 px-3 py-2 text-sm text-foreground/85 transition-colors hover:border-flux/50 hover:text-flux"
          >
            {s.label}
          </a>
        ))}
      </nav>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_260px]">
        <div className="max-w-3xl">
          <Secao id="faraday" numero="01" titulo="Lei de Faraday-Neumann-Lenz">
            <P>
              O fluxo do campo magnético através de uma superfície é a integral do campo sobre a
              área. Sempre que esse fluxo varia no tempo — por mudança de B, de área, de orientação
              ou de qualquer combinação delas — aparece uma força eletromotriz induzida.
            </P>
            <Formula latex="\Phi_B = \int \vec{B}\cdot d\vec{A} \qquad \varepsilon = -\frac{d\Phi_B}{dt}" />
            <P>
              Para uma bobina de N espiras, cada espira contribui com sua própria fem e o total é a
              soma delas. Esse é o fluxo concatenado ou fluxo conjugado.
            </P>
            <Formula latex="\varepsilon_{ind} = \sum_{espiras}\left(-\frac{d\varphi_B}{dt}\right) = -\frac{d}{dt}\sum_{espiras}\varphi_B = -N\frac{d\varphi_B}{dt}" />
            <P>
              O sinal negativo é a lei de Lenz: a corrente induzida tem sempre o sentido que gera um
              campo magnético que se opõe à variação do fluxo que a criou. Não é uma convenção — é a
              conservação de energia. Sem ela, um ímã aproximado de uma espira seria acelerado pela
              corrente que ele mesmo induz, criando energia do nada.
            </P>
            <P>
              A forma mais geral substitui a fem pela circulação do campo elétrico induzido, válida
              até mesmo no vácuo, onde não existe circuito algum.
            </P>
            <Formula
              latex="\oint \vec{E}\cdot d\vec{l} = -\frac{d\Phi_B}{dt} \neq 0"
              legenda="O campo elétrico induzido não é conservativo: não existe potencial escalar V associado a ele."
            />
          </Secao>

          <Secao id="indutancia" numero="02" titulo="Autoindutância e indutância mútua">
            <P>
              Num solenoide de raio R, comprimento H e N espiras, o campo interno é praticamente
              uniforme e o externo, desprezível. Pela lei de Ampère, B = μ₀ n i com n = N/H.
              Multiplicando pelo número de espiras e pela área da seção reta obtemos o fluxo
              concatenado.
            </P>
            <Formula latex="\phi_{B,sol} = N A (\mu_0 n i) = \mu_0 n^2 V i, \qquad A = \pi R^2,\; V = A H" />
            <P>
              O fluxo concatenado é proporcional à corrente. A constante de proporcionalidade
              depende apenas da geometria e da permeabilidade do meio — chamamos isso de indutância.
            </P>
            <Formula latex="\phi_{B,conj} = L\,i \qquad\Longrightarrow\qquad L_{sol} = \mu_0 n^2 V" />
            <Nota titulo="Por que N²">
              O campo gerado dentro do solenoide é proporcional a N; o fluxo concatenado das N
              espiras multiplica esse resultado novamente por N. Daí a dependência quadrática:
              dobrar o número de espiras quadruplica a indutância.
            </Nota>
            <P>
              Derivando a relação de proporcionalidade e combinando com a lei de Faraday, chega-se à
              equação que define operacionalmente a indutância — e permite medi-la mesmo quando a
              geometria é complicada demais para calcular.
            </P>
            <Formula latex="\varepsilon = -L\frac{di}{dt}" />
            <P>
              Quando o fluxo criado por uma bobina atravessa outra, falamos de indutância mútua M.
              É o mesmo conceito, com a corrente num enrolamento e o fluxo no outro — a base física
              do transformador.
            </P>
            <Formula latex="\Phi_{21} = M i_1 \qquad \varepsilon_2 = -M\frac{di_1}{dt} \qquad M = k\sqrt{L_1 L_2}" />
            <P>
              A unidade de indutância é o henry: 1 H = 1 Wb/A = 1 T·m²/A, em homenagem a Joseph
              Henry, que desenvolveu a teoria da indução independentemente de Faraday.
            </P>
          </Secao>

          <Secao id="energia" numero="03" titulo="Energia armazenada no campo magnético">
            <P>
              Partindo da equação de malha de um circuito RL e multiplicando tudo pela corrente,
              obtemos um balanço de potências: o que a fonte entrega, o que o resistor dissipa e o
              que o indutor absorve para construir seu campo.
            </P>
            <Formula latex="\varepsilon i = R i^2 + L\,i\,\frac{di}{dt}" />
            <P>
              Integrando o último termo desde corrente nula até o valor i(t), obtemos a energia
              armazenada pelo indutor — perfeitamente análoga à energia de um capacitor carregado.
            </P>
            <Formula latex="U_L = \int_0^{i} L\,i\,di = \tfrac{1}{2} L i^2 \qquad\text{(compare: } U_C = \frac{q^2}{2C}\text{)}" />
            <P>
              Substituindo L e i pelas grandezas do solenoide e dividindo pelo volume, o resultado
              deixa de depender da geometria: sobra apenas o campo. Essa é a densidade de energia
              magnética, válida em qualquer ponto do espaço onde haja campo.
            </P>
            <Formula
              latex="u_B = \frac{dU_B}{dV} = \frac{B^2}{2\mu_0} \qquad u_{EM} = \tfrac{1}{2}\epsilon_0 E^2 + \frac{B^2}{2\mu_0}"
              legenda="A energia total numa região é a integral de volume dessa densidade."
            />
          </Secao>

          <Secao id="rl" numero="04" titulo="Circuitos RL e resposta dinâmica">
            <P>
              Fechando a chave de um circuito com fonte, resistor e indutor em série, a lei das
              malhas dá uma equação diferencial de primeira ordem. Seu efeito prático: a corrente
              nunca salta instantaneamente.
            </P>
            <Formula latex="\varepsilon - Ri - L\frac{di}{dt} = 0 \;\Longrightarrow\; i(t) = \frac{\varepsilon}{R}\left(1 - e^{-t/\tau}\right), \quad \tau = \frac{L}{R}" />
            <P>
              Em t = τ a corrente atingiu 63,2% do valor final; em 5τ, mais de 99%. Ao abrir a
              chave, a corrente decai exponencialmente com a mesma constante — e, se a interrupção
              for abrupta, di/dt enorme produz a fem que provoca o arco elétrico visível em chaves
              de circuitos indutivos.
            </P>
            <Formula latex="i(t) = i_0\,e^{-t/\tau}" />
            <Nota titulo="Onde isso aparece">
              Ignição de motores a combustão, fontes chaveadas, filtros de rádio-frequência e a
              corrente de partida de motores elétricos são todos governados por essa mesma constante
              de tempo.
            </Nota>
            <div className="mt-8">
              <Link
                to="/laboratorio"
                className="inline-block rounded-md bg-flux px-5 py-3 text-sm font-medium text-flux-foreground transition-opacity hover:opacity-90"
              >
                Simular essas equações no laboratório →
              </Link>
            </div>
          </Secao>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-border bg-card/60 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Formulário rápido
            </p>
            <ul className="mt-4 space-y-3 font-mono text-sm text-foreground/85">
              <li>ε = −dΦ_B/dt</li>
              <li>∮E·dl = −dΦ_B/dt</li>
              <li>L = μ₀n²V</li>
              <li>ε = −L·di/dt</li>
              <li>M = k√(L₁L₂)</li>
              <li>U = ½Li²</li>
              <li>u = B²/2μ₀</li>
              <li>τ = L/R</li>
              <li>ε = Blv</li>
              <li>F/q = E + v × B</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Secao({
  id,
  numero,
  titulo,
  children,
}: {
  id: string;
  numero: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border/70 pt-10 first:border-0 first:pt-0 [&+section]:mt-16">
      <p className="font-mono text-xs text-ember">{numero}</p>
      <h2 className="mt-2 text-3xl font-semibold text-foreground">{titulo}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-[1.0625rem] leading-8 text-foreground/85">{children}</p>;
}

function Nota({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <aside className="my-8 rounded-lg border border-ember/35 bg-ember/10 px-5 py-5">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-ember">{titulo}</p>
      <p className="text-[1rem] leading-7 text-foreground/85">{children}</p>
    </aside>
  );
}
