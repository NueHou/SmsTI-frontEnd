// Usamos objetos para guardar valores que se repetem,
// como os papéis e status dos usuários.

export const Role = {
  ADMIN: 'Nivel3',
  TECNICO: 'Nivel2',
  USUARIO: 'Nivel1'
};

export const Status = {
  PENDENTE: 'PENDENTE',
  ARQUIVADO: 'ARQUIVADO',
};

export const Categoria = {
  HARDWARE: "HARDWARE",
  SOFTWARE: "SOFTWARE",
  REDES: "REDES", 
  SEGURANCA: "SEGURANCA",
  DADOS_E_ARMAZENAMENTO:"DADOS_E_ARMAZENAMENTO", 
  SISTEMA_OPERACIONAL:"SISTEMA_OPERACIONAL",
  PERIFERICOS:"PERIFERICOS",
  SERVICOS_CORPORATIVOS:"SERVICOS_CORPORATIVOS",
  ACESSO_E_SENHA:"ACESSO_E_SENHA",
  CONFIGURACAO:"CONFIGURACAO",
  OUTROS:"OUTROS"
};

export const Prioridade = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta',
  URGENTE: 'Urgente',
};

export const StatusUsuario = {
  ATIVO: 'STATUS_ATIVO',
  INATIVO: 'STATUS_INATIVO',
};
