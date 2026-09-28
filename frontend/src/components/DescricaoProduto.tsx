/**
 * Renderiza descrição vinda do CMS: texto simples ou HTML (richtext).
 */
export function DescricaoProduto({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const t = text.trim();
  if (!t) return null;
  const pareceHtml = t.startsWith("<");
  if (pareceHtml) {
    return (
      <div
        className={`rich-text ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: t }}
      />
    );
  }
  return <p className={`text-muted ${className}`.trim()}>{t}</p>;
}
