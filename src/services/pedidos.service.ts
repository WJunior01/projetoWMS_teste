import api from "./api";
import { Pedido } from "../types/models";

interface PedidosParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  cliente?: string;
  transportadora?: string;
}

export const pedidosService = {
  async listarPedidos(
    params: PedidosParams = {}
  ): Promise<{ data: Pedido[]; total: number }> {
    // Em um ambiente real, descomentar a linha abaixo:
    // const response = await api.get('/pedidos', { params });
    // return response.data;

    // Para fins de demonstração, simulamos dados de pedidos
    const mockPedidos: Pedido[] = Array(42)
      .fill(null)
      .map((_, index) => ({
        id: `${100000 + index}`,
        numero: `PED-${100000 + index}`,
        dataEmissao: new Date().toISOString(),
        cliente: {
          id: `${(index % 3) + 1}`,
          nome: `Cliente ${
            index % 3 === 0 ? "A" : index % 3 === 1 ? "B" : "C"
          }`,
          cnpj: `${Math.floor(Math.random() * 90 + 10)}.${Math.floor(
            Math.random() * 900 + 100
          )}.${Math.floor(Math.random() * 900 + 100)}/0001-${Math.floor(
            Math.random() * 90 + 10
          )}`,
        },
        nf: `NF-${54321 + index}`,
        doca: `Doca ${(index % 4) + 1}`,
        status: [
          "Pendente",
          "Em Separação",
          "Separado",
          "Em Conferência",
          "Finalizado",
        ][index % 5],
        observacao: index % 2 === 0 ? "Urgente" : undefined,
        transportadora: `Trans ${(index % 3) + 1}`,
        itens: [],
      }));

    // Filtragem simulada
    let filteredPedidos = [...mockPedidos];

    if (params.search) {
      const search = params.search.toLowerCase();
      filteredPedidos = filteredPedidos.filter(
        (pedido) =>
          pedido.numero.toLowerCase().includes(search) ||
          pedido.cliente.nome.toLowerCase().includes(search) ||
          (pedido.nf && pedido.nf.toLowerCase().includes(search))
      );
    }

    if (params.status) {
      filteredPedidos = filteredPedidos.filter(
        (pedido) => pedido.status === params.status
      );
    }

    if (params.cliente) {
      filteredPedidos = filteredPedidos.filter(
        (pedido) => pedido.cliente.nome === params.cliente
      );
    }

    if (params.transportadora) {
      filteredPedidos = filteredPedidos.filter(
        (pedido) => pedido.transportadora === params.transportadora
      );
    }

    // Paginação simulada
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: filteredPedidos.slice(startIndex, endIndex),
      total: filteredPedidos.length,
    };
  },

  async obterPedido(id: string): Promise<Pedido> {
    // Em um ambiente real, descomentar a linha abaixo:
    // const response = await api.get(`/pedidos/${id}`);
    // return response.data;

    // Para fins de demonstração, simulamos um pedido
    return {
      id,
      numero: `PED-${id}`,
      dataEmissao: new Date().toISOString(),
      cliente: {
        id: "1",
        nome: "Cliente A",
        cnpj: "12.345.678/0001-90",
      },
      nf: `NF-${parseInt(id) + 1000}`,
      doca: "Doca 1",
      status: "Em Separação",
      observacao: "Entrega prioritária",
      transportadora: "Trans 1",
      itens: Array(5)
        .fill(null)
        .map((_, index) => ({
          id: `${index + 1}`,
          produto: {
            id: `${index + 1}`,
            codigo: `PROD-${1000 + index}`,
            descricao: `Produto ${index + 1}`,
            unidade: "UN",
            categoria: "Categoria A",
            estoque: 100,
          },
          quantidade: Math.floor(Math.random() * 10) + 1,
          precoUnitario: parseFloat((Math.random() * 100 + 10).toFixed(2)),
          total: 0, // Será calculado abaixo
        })),
    };
  },

  async criarPedido(pedido: Omit<Pedido, "id">): Promise<Pedido> {
    // Em um ambiente real, descomentar a linha abaixo:
    // const response = await api.post('/pedidos', pedido);
    // return response.data;

    // Para fins de demonstração, simulamos a criação
    return {
      ...pedido,
      id: Math.floor(Math.random() * 10000).toString(),
    };
  },

  async atualizarPedido(id: string, pedido: Partial<Pedido>): Promise<Pedido> {
    // Em um ambiente real, descomentar a linha abaixo:
    // const response = await api.put(`/pedidos/${id}`, pedido);
    // return response.data;

    // Para fins de demonstração, simulamos a atualização
    return {
      id,
      numero: pedido.numero || `PED-${id}`,
      dataEmissao: pedido.dataEmissao || new Date().toISOString(),
      cliente: pedido.cliente || {
        id: "1",
        nome: "Cliente A",
        cnpj: "12.345.678/0001-90",
      },
      nf: pedido.nf,
      doca: pedido.doca,
      status: pedido.status || "Pendente",
      observacao: pedido.observacao,
      transportadora: pedido.transportadora,
      itens: pedido.itens || [],
    };
  },

  async excluirPedido(id: string): Promise<void> {
    // Em um ambiente real, descomentar a linha abaixo:
    // await api.delete(`/pedidos/${id}`);

    // Para fins de demonstração, não fazemos nada
    console.log(`Pedido ${id} excluído com sucesso`);
    return Promise.resolve();
  },
};
