import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import type { RegistroPonto } from "../types";

const tipos = [
  { valor: "ENTRADA", label: "Entrada" },
  { valor: "SAIDA_ALMOCO", label: "Saída Almoço" },
  { valor: "VOLTA_ALMOCO", label: "Volta Almoço" },
  { valor: "SAIDA", label: "Saída" },
] as const;

export default function BaterPonto() {
  const { usuario, logout } = useAuth();
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function baterPonto(tipo: string) {
    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await api.post<RegistroPonto>("/ponto", { tipo });
      setMensagem(`Ponto registrado: ${resposta.data.tipo} às ${resposta.data.dataHora}`);
    } catch (err) {
      setMensagem("Erro ao registrar ponto");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <h1>Olá, {usuario?.nome}</h1>
      <button onClick={logout}>Sair</button>

      <h2>Bater Ponto</h2>
      <div>
        {tipos.map((tipo) => (
          <button
            key={tipo.valor}
            onClick={() => baterPonto(tipo.valor)}
            disabled={carregando}
          >
            {tipo.label}
          </button>
        ))}
      </div>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}