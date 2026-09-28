import type { Produto } from "../types/produto";
import { DescricaoProduto } from "./DescricaoProduto";
import { useCart } from "../context/CartContext";
import { urlImagemAbsoluta } from "../lib/api";
import { Link } from "react-router-dom";
import { formatCurrency } from "../config";

type Props = { produto: Produto };

/**
 * Card de produto no catálogo: imagem, texto e controles de quantidade / adicionar.
 */
export function ProductCard({ produto }: Props) {
  const { adicionar, atualizarQuantidade, itens } = useCart();

  /**
   * Item já adicionado no carrinho (se existir).
   *
   * Importante para duas coisas:
   * - mostrar a quantidade atual
   * - impedir que o usuário aumente além do estoque disponível
   */
  const noCarrinho = itens.find((p) => p.id === produto.id);
  const quantidadeNoCarrinho = noCarrinho?.quantidade ?? 0;

  const img = urlImagemAbsoluta(produto.imagemUrl);

  /**
   * Regra de estoque:
   * - `produto.estoque` representa o total disponível
   * - se o usuário já reservou X unidades no carrinho, o que resta para somar é (estoque - X)
   *
   * Isso evita o caso comum em que o botão "+" continua habilitado mesmo
   * quando o carrinho já está no limite do estoque.
   */
  const restanteParaAdicionar = Math.max(
    0,
    produto.estoque - quantidadeNoCarrinho,
  );
  const semEstoque = produto.estoque <= 0;
  const podeAumentarQuantidade = restanteParaAdicionar > 0;

  /**
   * Estado da disponibilidade derivado do modelo genérico.
   */
  const disponibilidadeTexto = semEstoque ? "Indisponível" : "Disponível";

  return (
    <article className="product-card">
      <div className="product-card__media">
        {img ? (
          <img
            src={img}
            alt={produto.nome}
            className="product-card__img"
            loading="lazy"
          />
        ) : (
          <div className="product-card__placeholder" aria-hidden>
            sem foto
          </div>
        )}
      </div>
      <div className="product-card__body">
        <h2 className="product-card__title">
          <Link to={`/produto/${produto.slug}`}>{produto.nome}</Link>
        </h2>
        {produto.categoria && <p className="text-muted small">{produto.categoria}</p>}
        <DescricaoProduto text={produto.descricao} />
        <p className="product-card__availability">
          {disponibilidadeTexto}
          {/* Badges curtos ajudam a bater o olho no estado do estoque. */}
          {semEstoque ? (
            <span className="badge badge--muted">esgotado</span>
          ) : restanteParaAdicionar <= 3 ? (
            <span className="badge badge--muted">
              restam {restanteParaAdicionar}
            </span>
          ) : null}
        </p>
        <p className="product-card__price">{formatCurrency(produto.preco)}</p>
        <div className="product-card__actions">
          {noCarrinho ? (
            <div className="qty-row">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => atualizarQuantidade(produto.id, -1)}
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <span className="qty-row__value">{noCarrinho.quantidade}</span>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => atualizarQuantidade(produto.id, 1)}
                disabled={!podeAumentarQuantidade}
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => adicionar(produto)}
              disabled={semEstoque}
            >
              {semEstoque ? "Sem estoque" : "Adicionar ao carrinho"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
