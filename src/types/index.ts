export interface Usuario {
  id: number;
  nome: string;
  email: string;
  papel: "FUNCIONARIO" | "GESTOR";
}

export interface RegistroPonto {
  id: number;
  tipo: "ENTRADA" | "SAIDA_ALMOCO" | "VOLTA_ALMOCO" | "SAIDA";
  dataHora: string;
  usuario: Usuario;
}

export interface SolicitacaoAjuste {
  id: number;
  dia: string;
  horarioCorreto: string;
  justificativa: string;
  status: "PENDENTE" | "APROVADA" | "REJEITADA";
  funcionario: Usuario;
  gestor: Usuario | null;
}