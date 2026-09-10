import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Layout() {
  const { usuario, logout } = useAuth();

  return (
    <div>
      <header>
        <span>Olá, {usuario?.nome}</span>
        <nav>
          <Link to="/ponto">Bater Ponto</Link>
          {" | "}
          <Link to="/historico">Histórico</Link>
          {" | "}
          <Link to="/solicitar-ajuste">Solicitar Ajuste</Link>
        </nav>
        <button onClick={logout}>Sair</button>
      </header>
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
}