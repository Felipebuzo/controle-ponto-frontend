import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import BaterPonto from "./pages/BaterPonto";
import Historico from "./pages/Historico";
import SolicitarAjuste from "./pages/SolicitarAjuste";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/ponto" element={<BaterPonto />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/solicitar-ajuste" element={<SolicitarAjuste />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;