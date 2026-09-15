import katex from "katex";

export function Formula({
  latex,
  legenda,
  inline = false,
}: {
  latex: string;
  legenda?: string | undefined;
  inline?: boolean | undefined;
}) {
  const html = katex.renderToString(latex, {
    displayMode: !inline,
    throwOnError: false,
    output: "html",
  });

  if (inline) {
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <figure className="my-7 rounded-lg border border-border bg-surface/70 px-5 py-6">
      <div
        className="overflow-x-auto text-center text-foreground"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {legenda ? (
        <figcaption className="mt-4 border-t border-border/60 pt-3 text-center text-xs leading-relaxed text-muted-foreground">
          {legenda}
        </figcaption>
      ) : null}
    </figure>
  );
}
