import { useEffect, useState } from "react";
import api from "../services/api";
import type { RegistroPonto } from "../types";

export default function Historico() {
  const [registros, setRegistros] = useState<RegistroPonto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarHistorico() {
      try {
        const resposta = await api.get<RegistroPonto[]>("/ponto/meu-historico");
        setRegistros(resposta.data);
      } catch (err) {
        console.error("Erro ao carregar histórico", err);
      } finally {
        setCarregando(false);
      }
    }

    carregarHistorico();
  }, []);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Meu Histórico</h1>
      {registros.length === 0 ? (
        <p>Nenhum registro encontrado.</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Data/Hora</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.tipo}</td>
                <td>{new Date(registro.dataHora).toLocaleString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}