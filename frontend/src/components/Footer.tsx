import { Link } from "react-router-dom";
import { storeConfig } from "../config";

/**
 * Rodapé com links rápidos e aviso de que o site é vitrine (pedido via WhatsApp).
 */
export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="site-footer__title">{storeConfig.name}</p>
          <p className="text-muted small">
            {storeConfig.description}
          </p>
        </div>
        <div>
          <p className="site-footer__title">Navegar</p>
          <ul className="site-footer__links">
            <li>
              <Link to="/catalogo">Catálogo</Link>
            </li>
            <li>
              <Link to="/carrinho">Carrinho</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="site-footer__title">Pedidos</p>
          <p className="text-muted small">
            Os pedidos são finalizados pelo WhatsApp. O carrinho guarda suas
            escolhas neste aparelho.
          </p>
        </div>
      </div>
      <p className="site-footer__copy">
        © {ano} {storeConfig.name}
      </p>
    </footer>
  );
}
