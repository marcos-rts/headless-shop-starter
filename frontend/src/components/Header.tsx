import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { storeConfig } from "../config";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link${isActive ? " nav-link--active" : ""}`;

/**
 * Cabeçalho fixo com identidade configurável e navegação principal.
 */
export function Header() {
  const { totalItens } = useCart();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-logo" end>
          <span className="site-logo__text">
            {storeConfig.name}
            <small>vitrine online</small>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Principal">
          <NavLink to="/" className={linkClass} end>
            Início
          </NavLink>
          <NavLink to="/catalogo" className={linkClass}>
            Catálogo
          </NavLink>
          <NavLink to="/carrinho" className={linkClass}>
            Carrinho
            {totalItens > 0 && (
              <span
                className="cart-badge"
                aria-label={`Itens no carrinho: ${totalItens}`}
              >
                {totalItens}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
