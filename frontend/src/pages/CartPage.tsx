import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../config";

/**
 * Carrinho: revisão dos itens, totais e envio do pedido via WhatsApp (sem API de checkout).
 */
export function CartPage() {
  const {
    itens,
    totalPreco,
    totalItens,
    atualizarQuantidade,
    remover,
    limpar,
    abrirWhatsAppPedido,
  } = useCart();

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Sua seleção</p>
        <h1 className="page-header__title">Carrinho</h1>
        <p className="page-header__intro text-muted">
          {totalItens === 0
            ? "Nenhum item ainda. Explore o catálogo e adicione produtos aqui."
            : `${totalItens} item(ns) — total ${formatCurrency(totalPreco)}`}
        </p>
      </header>

      {itens.length === 0 && (
        <section className="empty-cart" aria-label="Carrinho vazio">
          <div className="empty-cart__grid">
            <div className="empty-cart__copy">
              <h2 className="empty-cart__title">Seu carrinho está vazio</h2>
              <p className="text-muted">
                Explore o catálogo para adicionar produtos ao seu pedido.
              </p>
              <div className="empty-cart__cta">
                <Link to="/catalogo" className="btn btn--primary btn--lg">
                  Abrir catálogo
                </Link>
              </div>
            </div>

            <figure className="empty-cart__figure">
              {/*
                IMAGEM DO EMPTY-STATE:
                - coloque `frontend/public/imagens/carrinho.jpg`
                - ou mude o caminho para o arquivo que você preferir
              */}
              <img
                src="/logo.svg"
                alt="Imagem demonstrativa do carrinho"
                className="empty-cart__img"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/logo.svg";
                }}
              />
            </figure>
          </div>
        </section>
      )}

      {itens.length > 0 && (
        <>
          <ul className="cart-list">
            {itens.map((item) => (
              <li key={item.id} className="cart-row">
                <div className="cart-row__media">
                  {item.imagemUrl ? (
                    <img
                      src={item.imagemUrl}
                      alt={item.nome}
                      className="cart-row__img"
                    />
                  ) : (
                    <div className="cart-row__placeholder" aria-hidden />
                  )}
                </div>
                <div className="cart-row__info">
                  <h2 className="cart-row__title">{item.nome}</h2>
                  <p className="cart-row__meta text-muted">
                    {formatCurrency(item.preco)} cada
                  </p>
                  <div className="qty-row cart-row__qty">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => atualizarQuantidade(item.id, -1)}
                      aria-label="Diminuir"
                    >
                      −
                    </button>
                    <span className="qty-row__value">{item.quantidade}</span>
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => atualizarQuantidade(item.id, 1)}
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-row__side">
                  <p className="cart-row__sub">
                    {formatCurrency(item.preco * item.quantidade)}
                  </p>
                  <button
                    type="button"
                    className="btn btn--link"
                    onClick={() => remover(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p className="cart-summary__total">
              Total: <strong>{formatCurrency(totalPreco)}</strong>
            </p>
            <div className="cart-summary__actions">
              <button
                type="button"
                className="btn btn--primary btn--lg"
                onClick={abrirWhatsAppPedido}
              >
                Finalizar no WhatsApp
              </button>
              <button
                type="button"
                className="btn btn--danger btn--ghost"
                onClick={() => {
                  if (window.confirm("Limpar todo o carrinho?")) limpar();
                }}
              >
                Limpar carrinho
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
