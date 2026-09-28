import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DescricaoProduto } from "../components/DescricaoProduto";
import { useCart } from "../context/CartContext";
import { fetchProduto, urlImagemAbsoluta } from "../lib/api";
import { formatCurrency } from "../config";
import type { Produto } from "../types/produto";

export function ProductPage() {
  const { slug } = useParams();
  const { adicionar } = useCart();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchProduto(slug).then(setProduto).catch((error: unknown) => {
      setErro(error instanceof Error ? error.message : "Não foi possível carregar o produto.");
    });
  }, [slug]);

  if (erro) return <div className="page"><div className="alert alert--error">{erro}</div></div>;
  if (!produto) return <div className="page"><p className="state-msg">Carregando produto…</p></div>;

  const imagem = urlImagemAbsoluta(produto.imagemUrl);
  const indisponivel = !produto.ativo || produto.estoque <= 0;

  return (
    <div className="page product-detail">
      <Link to="/catalogo" className="btn btn--ghost">← Voltar ao catálogo</Link>
      <div className="product-detail__grid">
        <div className="product-detail__media">
          {imagem ? <img src={imagem} alt={produto.nome} /> : <div className="product-card__placeholder">sem foto</div>}
        </div>
        <div className="product-detail__content">
          {produto.categoria && <p className="eyebrow">{produto.categoria}</p>}
          <h1 className="page-header__title">{produto.nome}</h1>
          <p className="product-card__price">{formatCurrency(produto.preco)}</p>
          <DescricaoProduto text={produto.descricao} />
          <p className="product-card__availability">{indisponivel ? "Indisponível" : "Disponível"}</p>
          <button className="btn btn--primary btn--lg" type="button" disabled={indisponivel} onClick={() => adicionar(produto)}>
            {indisponivel ? "Indisponível" : "Adicionar ao carrinho"}
          </button>
        </div>
      </div>
    </div>
  );
}
