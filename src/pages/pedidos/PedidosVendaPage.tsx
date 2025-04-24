import { useState } from 'react';
import { Search, List, Eye } from 'lucide-react';

export default function PedidosVendaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  // Dummy data for demo
  const docas = ["Doca 1", "Doca 2", "Doca 3", "Doca 4"];
  const clientes = ["Cliente A", "Cliente B", "Cliente C"];
  const transportadoras = ["Trans 1", "Trans 2", "Trans 3"];
  const statusOptions = ["Pendente", "Em Separação", "Separado", "Em Conferência", "Finalizado"];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pedidos de Venda</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span>Selecione a Doca:</span>
            <select className="input w-60">
              {docas.map((doca, index) => (
                <option key={index}>{doca}</option>
              ))}
            </select>
          </div>
          
          <button className="btn btn-info">
            ATRIBUIR
          </button>
          
          <button className="btn btn-danger ml-auto">
            CANCELAR PEDIDO
          </button>
          
          <button className="btn btn-warning">
            VOLTAR PEDIDO
          </button>
          
          <button className="btn btn-info">
            IMPRIMIR ETIQUETA
          </button>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <span>Cliente:</span>
            <select className="input">
              <option value="">Selecione...</option>
              {clientes.map((cliente, index) => (
                <option key={index}>{cliente}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Transportadora:</span>
            <select className="input">
              <option value="">Selecione...</option>
              {transportadoras.map((trans, index) => (
                <option key={index}>{trans}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Status:</span>
            <select className="input">
              <option value="">Todos</option>
              {statusOptions.map((status, index) => (
                <option key={index}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Pesquisar:</span>
            <div className="relative">
              <input
                type="text"
                className="input pr-10 w-full md:w-96"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
          
          <button className="btn btn-info">
            FILTRAR
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DATA
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID PEDIDO
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NOME ONDA
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NUM. GATE
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CLIENTE
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NF
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DOCA
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  OBS.
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TRANSP.
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selected.length === 10}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AÇÕES
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {100000 + index}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    ONDA-{200 + index}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    G-{10 + index}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    Cliente {index % 3 === 0 ? 'A' : index % 3 === 1 ? 'B' : 'C'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    NF-{54321 + index}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    Doca {(index % 4) + 1}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {statusOptions[index % 5]}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {index % 2 === 0 ? 'Urgente' : '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    Trans {(index % 3) + 1}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selected.includes((index + 1).toString())}
                      onChange={() => handleSelect((index + 1).toString())}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="p-2 bg-info-500 text-white rounded">
                        <List size={16} />
                      </button>
                      <button className="p-2 bg-secondary-500 text-white rounded">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">
              Mostrando 1-10 de 42 resultados
            </span>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline">Anterior</button>
            <button className="btn btn-primary">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
}