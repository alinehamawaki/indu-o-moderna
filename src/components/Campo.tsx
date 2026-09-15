import type { ReactNode } from "react";

export function Painel({
  titulo,
  descricao,
  children,
  id,
}: {
  titulo: string;
  descricao: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-xl border border-border bg-card/70 p-6 md:p-8"
    >
      <h2 className="text-2xl font-semibold text-foreground">{titulo}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">{descricao}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function Campo({
  label,
  unidade,
  valor,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  unidade: string;
  valor: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-foreground/85">{label}</span>
        <span className="font-mono text-sm text-flux">
          {Number(valor.toPrecision(6))} {unidade}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-2 accent-[var(--flux)]"
      />
    </label>
  );
}

export function Resultado({
  rotulo,
  valor,
  unidade,
  destaque = false,
}: {
  rotulo: string;
  valor: string;
  unidade: string;
  destaque?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-4 py-4 ${
        destaque ? "border-flux/40 bg-flux/10" : "border-border bg-surface/60"
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {rotulo}
      </p>
      <p className="mt-2 font-mono text-xl text-foreground">
        {valor}
        <span className="ml-1 text-sm text-muted-foreground">{unidade}</span>
      </p>
    </div>
  );
}

export function fmt(n: number, casas = 3) {
  if (!Number.isFinite(n)) return "—";
  if (n !== 0 && (Math.abs(n) < 1e-3 || Math.abs(n) >= 1e6)) {
    return n.toExponential(casas);
  }
  return n.toLocaleString("pt-BR", { maximumFractionDigits: casas });
}
