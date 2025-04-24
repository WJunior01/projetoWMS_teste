import { useState } from 'react';
import { Search, FileUp, Eye, Trash2, List } from 'lucide-react';

export default function NfsRecebidasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selected, setSelected] = useState<string[]>([]);

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
      <h1 className="text-2xl font-bold mb-6">NF's Recebidas</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <button className="btn btn-danger flex items-center gap-2">
            <Trash2 size={16} />
            EXCLUIR NF
          </button>
          
          <div className="flex gap-4">
            <button className="btn btn-info flex items-center gap-2">
              <FileUp size={16} />
              IMPORTAR XML
            </button>
            <button className="btn btn-success flex items-center gap-2">
              <Eye size={16} />
              VISUALIZAR NF
            </button>
          </div>
        </div>
        
        <div className="p-4 flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>Status:</span>
            <select 
              className="input max-w-[160px]"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option>Todos</option>
              <option>Pendente</option>
              <option>Em Conferência</option>
              <option>Conferido</option>
              <option>Divergência</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Pesquisar:</span>
            <div className="relative">
              <input
                type="text"
                className="input pr-10 w-full md:w-[300px]"
                placeholder="Buscar por Nº NF, CNPJ, Fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selected.length === 10}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DATA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nº NF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FORNECEDOR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CNPJ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VALOR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AÇÕES
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selected.includes((index + 1).toString())}
                      onChange={() => handleSelect((index + 1).toString())}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {100000 + index}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Fornecedor {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {`${Math.floor(Math.random() * 90 + 10)}.${Math.floor(Math.random() * 900 + 100)}.${Math.floor(Math.random() * 900 + 100)}/0001-${Math.floor(Math.random() * 90 + 10)}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    R$ {(Math.random() * 10000).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {['Pendente', 'Em Conferência', 'Conferido', 'Divergência'][index % 4]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="p-2 bg-info-500 text-white rounded">
                        <List size={16} />
                      </button>
                      <button className="p-2 bg-secondary-500 text-white rounded">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 bg-danger-500 text-white rounded">
                        <Trash2 size={16} />
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