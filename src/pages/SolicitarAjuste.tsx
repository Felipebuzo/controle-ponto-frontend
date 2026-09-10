import { useState } from "react";
import api from "../services/api";

export default function SolicitarAjuste() {
  const [dia, setDia] = useState("");
  const [horarioCorreto, setHorarioCorreto] = useState("");
  const [justificativa, setJustificativa] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      await api.post("/solicitacoes", { dia, horarioCorreto, justificativa });
      setMensagem("Solicitação enviada com sucesso!");
      setDia("");
      setHorarioCorreto("");
      setJustificativa("");
    } catch (err) {
      setMensagem("Erro ao enviar solicitação");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <h1>Solicitar Ajuste de Ponto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dia:</label>
          <input
            type="date"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Horário correto:</label>
          <input
            type="time"
            value={horarioCorreto}
            onChange={(e) => setHorarioCorreto(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Justificativa:</label>
          <textarea
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={carregando}>
          Enviar Solicitação
        </button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}