import { useEffect, useState } from "react";
import api from "../services/api";
import type { SolicitacaoAjuste } from "../types";

export default function GestorPendentes() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAjuste[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [processando, setProcessando] = useState<number | null>(null);

  useEffect(() => {
    carregarPendentes();
  }, []);

  async function carregarPendentes() {
    setCarregando(true);
    try {
      const resposta = await api.get<SolicitacaoAjuste[]>("/solicitacoes/pendentes");
      setSolicitacoes(resposta.data);
    } catch (err) {
      console.error("Erro ao carregar solicitações", err);
    } finally {
      setCarregando(false);
    }
  }

  async function aprovar(id: number) {
    setProcessando(id);
    try {
      await api.patch(`/solicitacoes/${id}/aprovar`);
      await carregarPendentes();
    } catch (err) {
      console.error("Erro ao aprovar", err);
    } finally {
      setProcessando(null);
    }
  }

  async function rejeitar(id: number) {
    setProcessando(id);
    try {
      await api.patch(`/solicitacoes/${id}/rejeitar`);
      await carregarPendentes();
    } catch (err) {
      console.error("Erro ao rejeitar", err);
    } finally {
      setProcessando(null);
    }
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Solicitações Pendentes</h1>
      {solicitacoes.length === 0 ? (
        <p>Nenhuma solicitação pendente.</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Dia</th>
              <th>Horário Correto</th>
              <th>Justificativa</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {solicitacoes.map((solicitacao) => (
              <tr key={solicitacao.id}>
                <td>{solicitacao.funcionario.nome}</td>
                <td>{solicitacao.dia}</td>
                <td>{solicitacao.horarioCorreto}</td>
                <td>{solicitacao.justificativa}</td>
                <td>
                  <button
                    onClick={() => aprovar(solicitacao.id)}
                    disabled={processando === solicitacao.id}
                  >
                    Aprovar
                  </button>
                  <button
                    onClick={() => rejeitar(solicitacao.id)}
                    disabled={processando === solicitacao.id}
                  >
                    Rejeitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}