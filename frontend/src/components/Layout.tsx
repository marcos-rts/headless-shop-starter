import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * Moldura comum: cabeçalho, área de conteúdo das rotas e rodapé.
 */
export function Layout() {
  return (
    <div className="site-shell">
      <a href="#conteudo-principal" className="skip-link">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo-principal" className="site-main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
