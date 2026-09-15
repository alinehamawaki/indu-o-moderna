import type { Bloco } from "@/data/artigos";
import { Formula } from "./Formula";

export function Blocos({ blocos }: { blocos: Bloco[] }) {
  return (
    <div className="mt-10">
      {blocos.map((bloco, i) => {
        switch (bloco.tipo) {
          case "subtitulo":
            return (
              <h2
                key={i}
                className="mt-12 mb-4 text-2xl font-semibold text-foreground md:text-3xl"
              >
                {bloco.texto}
              </h2>
            );
          case "paragrafo":
            return (
              <p key={i} className="mb-5 text-[1.0625rem] leading-8 text-foreground/85">
                {bloco.texto}
              </p>
            );
          case "formula":
            return <Formula key={i} latex={bloco.latex} legenda={bloco.legenda} />;
          case "lista":
            return (
              <ul key={i} className="my-6 space-y-3">
                {bloco.itens.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[1.0625rem] leading-7 text-foreground/85">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-flux" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "nota":
            return (
              <aside
                key={i}
                className="my-8 rounded-lg border border-ember/35 bg-ember/10 px-5 py-5"
              >
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-ember">
                  {bloco.titulo}
                </p>
                <p className="text-[1rem] leading-7 text-foreground/85">{bloco.texto}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
