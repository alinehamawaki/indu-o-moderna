import { useState } from "react";
import { Campo, Painel, Resultado, fmt } from "@/components/Campo";
import { Formula } from "@/components/Formula";

const MU0 = 4 * Math.PI * 1e-7;

export function CalculadoraSolenoide() {
  const [espiras, setEspiras] = useState(500);
  const [comprimento, setComprimento] = useState(0.2);
  const [raio, setRaio] = useState(0.02);
  const [corrente, setCorrente] = useState(2);

  const n = espiras / comprimento;
  const area = Math.PI * raio * raio;
  const volume = area * comprimento;
  const L = MU0 * n * n * volume;
  const B = MU0 * n * corrente;
  const fluxoConj = L * corrente;
  const U = 0.5 * L * corrente * corrente;
  const u = (B * B) / (2 * MU0);

  return (
    <Painel
      id="solenoide"
      titulo="Indutância e energia de um solenoide"
      descricao="Modelo do solenoide ideal da Aula 34: campo uniforme no interior e praticamente nulo fora. Observe a dependência quadrática com o número de espiras."
    >
      <Formula latex="L = \mu_0 n^2 V \qquad U = \tfrac{1}{2} L i^2 \qquad u_B = \frac{B^2}{2\mu_0}" />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <Campo
            label="Número de espiras N"
            unidade="esp."
            valor={espiras}
            onChange={setEspiras}
            min={10}
            max={5000}
            step={10}
          />
          <Campo
            label="Comprimento H"
            unidade="m"
            valor={comprimento}
            onChange={setComprimento}
            min={0.01}
            max={1}
            step={0.01}
          />
          <Campo
            label="Raio R"
            unidade="m"
            valor={raio}
            onChange={setRaio}
            min={0.002}
            max={0.1}
            step={0.001}
          />
          <Campo
            label="Corrente i"
            unidade="A"
            valor={corrente}
            onChange={setCorrente}
            min={0.1}
            max={50}
            step={0.1}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 self-start">
          <Resultado rotulo="Indutância L" valor={fmt(L * 1000, 4)} unidade="mH" destaque />
          <Resultado rotulo="Campo B" valor={fmt(B * 1000, 3)} unidade="mT" />
          <Resultado rotulo="Espiras por metro n" valor={fmt(n, 0)} unidade="esp./m" />
          <Resultado rotulo="Fluxo concatenado" valor={fmt(fluxoConj, 5)} unidade="Wb" />
          <Resultado rotulo="Energia armazenada U" valor={fmt(U * 1000, 4)} unidade="mJ" destaque />
          <Resultado rotulo="Densidade u = B²/2μ₀" valor={fmt(u, 3)} unidade="J/m³" />
          <div className="col-span-2 rounded-lg border border-border bg-surface/60 px-4 py-4 text-sm leading-7 text-muted-foreground">
            Volume do solenoide: {fmt(volume * 1e6, 2)} cm³. Multiplicando a densidade de energia
            pelo volume: {fmt(u * volume * 1000, 4)} mJ — o mesmo valor de ½Li², como esperado.
          </div>
        </div>
      </div>
    </Painel>
  );
}
