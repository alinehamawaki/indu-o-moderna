import { useState } from "react";
import { Campo, Painel, Resultado, fmt } from "@/components/Campo";
import { Formula } from "@/components/Formula";

export function CalculadoraTransformador() {
  const [v1, setV1] = useState(13800);
  const [n1, setN1] = useState(1200);
  const [n2, setN2] = useState(20);
  const [p, setP] = useState(15000);

  const v2 = (v1 * n2) / n1;
  const i1 = p / v1;
  const i2 = v2 > 0 ? p / v2 : 0;
  const razao = n2 / n1;

  return (
    <Painel
      id="transformador"
      titulo="Calculadora de transformador"
      descricao="Ajuste a tensão do primário, o número de espiras de cada enrolamento e a potência transferida. O modelo assume acoplamento ideal e potência conservada."
    >
      <Formula latex="\frac{V_2}{V_1} = \frac{N_2}{N_1} \qquad V_1 i_1 = V_2 i_2" />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <Campo
            label="Tensão no primário V₁"
            unidade="V"
            valor={v1}
            onChange={setV1}
            min={100}
            max={230000}
            step={100}
          />
          <Campo
            label="Espiras do primário N₁"
            unidade="esp."
            valor={n1}
            onChange={setN1}
            min={10}
            max={5000}
            step={10}
          />
          <Campo
            label="Espiras do secundário N₂"
            unidade="esp."
            valor={n2}
            onChange={setN2}
            min={1}
            max={5000}
            step={1}
          />
          <Campo
            label="Potência transferida P"
            unidade="W"
            valor={p}
            onChange={setP}
            min={100}
            max={500000}
            step={100}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 self-start">
          <Resultado rotulo="Tensão V₂" valor={fmt(v2, 2)} unidade="V" destaque />
          <Resultado rotulo="Relação N₂/N₁" valor={fmt(razao, 4)} unidade="" />
          <Resultado rotulo="Corrente i₁" valor={fmt(i1, 2)} unidade="A" />
          <Resultado rotulo="Corrente i₂" valor={fmt(i2, 2)} unidade="A" />
          <div className="col-span-2 rounded-lg border border-border bg-surface/60 px-4 py-4 text-sm leading-7 text-muted-foreground">
            {razao < 1
              ? "Transformador abaixador: a tensão cai e a corrente sobe na mesma proporção."
              : razao > 1
                ? "Transformador elevador: a tensão sobe e a corrente cai na mesma proporção."
                : "Transformador de isolação: mesma tensão, apenas separação galvânica."}
          </div>
        </div>
      </div>
    </Painel>
  );
}
