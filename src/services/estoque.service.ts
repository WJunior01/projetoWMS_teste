import api from "./api";
import { Produto } from "../types/models";

interface EstoqueParams {
  page?: number;
  limit?: number;
  search?: string;
  categoria?: string;
  localizacao?: string;
}

export const estoqueService = {
  async listarProdutos(
    params: EstoqueParams = {}
  ): Promise<{ data: Produto[]; total: number }> {
    // Em um ambiente real, descomentar a linha abaixo:
    // const response = await api.get('/produtos', { params });
    // return response.data;

    // Para fins de demonstração, simulamos dados de produtos
    const mockProdutos: Produto[] = Array(100)
      .fill(null)
      .map((_, index) => ({
        id: `${index + 1}`,
        codigo: `PROD-${1000 + index}`,
        descricao: `Produto ${index + 1}`,
        unidade: index % 3 === 0 ? "UN" : index % 3 === 1 ? "CX" : "KG",
        categoria: [
          "Eletrônicos",
          "Alimentos",
          "Vestuário",
          "Medicamentos",
          "Automotivo",
        ][index % 5],
        estoque: Math.floor(Math.random() * 1000),
        estoqueMinimo: Math.floor(Math.random() * 50),
        localizacao: `${String.fromCharCode(65 + (index % 5))}-${
          Math.floor(index / 5) + 1
        }-${(index % 10) + 1}`,
      }));

    // Filtragem simulada
    let filteredProdutos = [...mockProdutos];

    if (params.search) {
      const search = params.search.toLowerCase();
      filteredProdutos = filteredProdutos.filter(
        (produto) =>
          produto.codigo.toLowerCase().includes(search) ||
          produto.descricao.toLowerCase().includes(search)
      );
    }

    if (params.categoria) {
      filteredProdutos = filteredProdutos.filter(
        (produto) => produto.categoria === params.categoria
      );
    }

    if (params.localizacao) {
      filteredProdutos = filteredProdutos.filter((produto) =>
        produto.localizacao?.includes(params.localizacao || "")
      );
    }

    // Paginação simulada
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: filteredProdutos.slice(startIndex, endIndex),
      total: filteredProdutos.length,
    };
  },

  async obterProduto(id: string): Promise<Produto> {
    // Em um ambiente real, descomentar a linha abaixo:
    // const response = await api.get(`/produtos/${id}`);
    // return response.data;

    // Para fins de demonstração, simulamos um produto
    return {
      id,
      codigo: `PROD-${1000 + parseInt(id)}`,
      descricao: `Produto ${id}`,
      unidade: "UN",
      categoria: "Eletrônicos",
      estoque: 150,
      estoqueMinimo: 30,
      localizacao: "A-1-1",
    };
  },
};
