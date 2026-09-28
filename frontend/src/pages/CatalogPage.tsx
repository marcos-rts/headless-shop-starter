import { useEffect, useState } from "react";
import { fetchProdutos } from "../lib/api";
import type { Produto } from "../types/produto";
import { ProductCard } from "../components/ProductCard";

/**
 * Catálogo: lista produtos do Strapi (somente leitura na API; lógica de carrinho no cliente).
 */
export function CatalogPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let vivo = true;
    fetchProdutos()
      .then((lista) => {
        if (vivo) setProdutos(lista);
      })
      .catch((e: unknown) => {
        if (vivo)
          setErro(
            e instanceof Error
              ? e.message
              : "Não foi possível carregar os produtos.",
          );
      })
      .finally(() => {
        if (vivo) setCarregando(false);
      });
    return () => {
      vivo = false;
    };
  }, []);

  return (
    <div className="page">
      {/* Banner “de vitrine” para dar impacto visual logo no topo. */}
      <section className="catalog-banner" aria-label="Banner do catálogo">
        <div className="catalog-banner__inner">
          <div className="catalog-banner__copy">
            <p className="eyebrow">Vitrine</p>
            <h1 className="catalog-banner__title">Catálogo</h1>
            <p className="catalog-banner__text text-muted">
              Explore os produtos disponíveis e adicione itens ao carrinho. A
              confirmação do pedido acontece pelo WhatsApp.
            </p>
          </div>
          <figure className="catalog-banner__figure">
            {/*
              TROCAR IMAGEM DO BANNER:
              - coloque um arquivo em `frontend/public/imagens/` (ex.: `catalogo.jpg`)
              - mude o `src` para `/imagens/catalogo.jpg`
            */}
            <img
              src="/logo.svg"
              alt="Imagem demonstrativa do catálogo"
              className="catalog-banner__img"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/logo.svg";
              }}
            />
          </figure>
        </div>
      </section>

      {carregando && (
        <p className="state-msg" role="status">
          Carregando produtos…
        </p>
      )}

      {erro && (
        <div className="alert alert--error" role="alert">
          <strong>Não foi possível conectar ao catálogo.</strong> {erro}{" "}
          Verifique se o Strapi está em execução e se a URL em{" "}
          <code>VITE_API_URL</code> está correta.
        </div>
      )}

      {!carregando && !erro && produtos.length === 0 && (
        <p className="state-msg text-muted">
          Nenhum produto cadastrado ainda. Publique itens no painel do Strapi
          para vê-los aqui.
        </p>
      )}

      {!carregando && !erro && produtos.length > 0 && (
        <div className="product-grid">
          {produtos.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
