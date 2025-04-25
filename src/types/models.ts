// src/types/models.ts

// Usuário
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Pedido
export interface Pedido {
  id: string;
  numero: string;
  dataEmissao: string;
  cliente: Cliente;
  nf?: string;
  doca?: string;
  status: string;
  observacao?: string;
  transportadora?: string;
  itens: ItemPedido[];
}

// Item de Pedido
export interface ItemPedido {
  id: string;
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
  total: number;
}

// Produto
export interface Produto {
  id: string;
  codigo: string;
  descricao: string;
  unidade: string;
  categoria: string;
  estoque: number;
  estoqueMinimo?: number;
  localizacao?: string;
}

// Cliente
export interface Cliente {
  id: string;
  nome: string;
  cnpj: string;
  telefone?: string;
  email?: string;
  endereco?: string;
}

// Fornecedor
export interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  telefone?: string;
  email?: string;
  endereco?: string;
}

// Nota Fiscal
export interface NotaFiscal {
  id: string;
  numero: string;
  dataEmissao: string;
  fornecedor: Fornecedor;
  valor: number;
  status: string;
  itens: ItemNF[];
}

// Item de Nota Fiscal
export interface ItemNF {
  id: string;
  produto: Produto;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

// Armazém
export interface Armazem {
  id: string;
  nome: string;
  endereco: string;
  capacidade: string;
  ocupacao: string;
}

// Equipe
export interface Membro {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  setor: string;
  status: "Ativo" | "Férias" | "Afastado";
}

// Inventário
export interface Inventario {
  id: string;
  codigo: string;
  data: string;
  tipo: "Cíclico" | "Geral" | "Pontual";
  local: string;
  responsavel: string;
  status: "Em Andamento" | "Pendente" | "Concluído" | "Cancelado";
}

// Relatório
export interface Relatorio {
  id: string;
  titulo: string;
  tipo: string;
  dataGeracao: string;
  geradoPor: string;
  formato: string;
  tamanho: string;
}

// Expedição
export interface Expedicao {
  id: string;
  codigo: string;
  data: string;
  pedidos: Pedido[];
  status: string;
  transportadora: string;
  responsavel: string;
}

// Empresa
export interface Empresa {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  responsavel: string;
  cargo: string;
}

// Mensagem de Suporte
export interface MensagemSuporte {
  id: string;
  assunto: string;
  departamento: string;
  prioridade: "baixa" | "media" | "alta" | "urgente";
  mensagem: string;
  anexos?: File[];
  dataEnvio: string;
  status: "Aberto" | "Em Análise" | "Resolvido" | "Fechado";
}
