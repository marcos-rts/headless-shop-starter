import { Link } from "react-router-dom";

/**
 * Página inicial neutra para apresentar uma loja criada a partir do starter.
 */
export function HomePage() {
  return (
    <div className="page page--home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="eyebrow">Vitrine online</p>
          <h1 id="hero-title" className="hero__title">
            Uma base para sua loja
          </h1>
          <p className="hero__lead text-muted">
            Apresente seus produtos, organize seu catálogo e receba pedidos
            pelo WhatsApp com uma experiência simples e responsiva.
          </p>
          <div className="hero__cta">
            <Link to="/catalogo" className="btn btn--primary btn--lg">
              Ver catálogo
            </Link>
          </div>
        </div>
        <div className="hero__panel" aria-label="Foto de destaque">
          <div className="hero__ornament" aria-hidden />
          {/*
            IMAGEM DE ENTRADA (Home):
            - coloque um arquivo em `frontend/public/imagens/home.jpg`
            - mude `src` para `/imagens/home.jpg`

            A Home é a porta de entrada: uma boa foto aqui já “vende” o estilo.
          */}
          <img
            src="/logo.svg"
            alt="Identidade visual demonstrativa da loja"
            className="hero__img"
            loading="eager"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/logo.svg";
            }}
          />
          <p className="hero__quote">
            “Substitua este conteúdo por uma mensagem que represente sua loja.”
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="destaques-title">
        <h2 id="destaques-title" className="section__title">
          Recursos do starter
        </h2>
        <ul className="feature-grid">
          <li className="feature-card">
            <span className="feature-card__icon" aria-hidden>
              ✦
            </span>
            <h3 className="feature-card__title">Peças únicas</h3>
            <p className="text-muted">
              Cadastre produtos de diferentes segmentos pelo painel do Strapi.
            </p>
          </li>
          <li className="feature-card">
            <span className="feature-card__icon" aria-hidden>
              ◎
            </span>
            <h3 className="feature-card__title">Layout personalizável</h3>
            <p className="text-muted">
              Ajuste cores, tipografia, logo e conteúdo para sua identidade.
            </p>
          </li>
          <li className="feature-card">
            <span className="feature-card__icon" aria-hidden>
              ✉
            </span>
            <h3 className="feature-card__title">Pedido humano</h3>
            <p className="text-muted">
              Você monta o carrinho aqui e finaliza pelo WhatsApp com a gente,
              sem formulários engessados.
            </p>
          </li>
        </ul>
      </section>

      <section className="cta-banner">
        <div className="cta-banner__inner">
          <h2 className="cta-banner__title">
            Pronto para começar?
          </h2>
          <p className="cta-banner__text text-muted">
            Explore o catálogo, salve os itens no carrinho e envie o pedido em
            um clique.
          </p>
          <Link to="/catalogo" className="btn btn--primary btn--lg">
            Abrir catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}
