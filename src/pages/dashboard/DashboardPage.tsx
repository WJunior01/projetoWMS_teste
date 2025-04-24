import { 
  LayoutGrid, 
  Package, 
  BoxesIcon, 
  TruckIcon, 
  Users, 
  AlertTriangle 
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div 
        className={`mr-4 p-3 rounded-full ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

interface AlertCardProps {
  title: string;
  count: number;
  type: 'warning' | 'danger';
}

function AlertCard({ title, count, type }: AlertCardProps) {
  const bgColor = type === 'warning' ? 'bg-warning-50' : 'bg-danger-50';
  const borderColor = type === 'warning' ? 'border-warning-500' : 'border-danger-500';
  const textColor = type === 'warning' ? 'text-warning-700' : 'text-danger-700';

  return (
    <div className={`${bgColor} ${borderColor} border-l-4 p-4 rounded-r-lg`}>
      <div className="flex items-center">
        <AlertTriangle className={`${textColor} mr-2`} size={20} />
        <h3 className={`${textColor} font-medium`}>{title}</h3>
      </div>
      <p className="mt-1 text-sm">
        <span className="font-semibold">{count}</span> itens requerem atenção
      </p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Visão geral do seu armazém</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Pedidos Pendentes" 
          value={24} 
          icon={<Package size={24} className="text-white" />} 
          color="bg-primary-500"
        />
        <StatCard 
          title="NFs Recebidas Hoje" 
          value={12} 
          icon={<Package size={24} className="text-white" />} 
          color="bg-info-500"
        />
        <StatCard 
          title="Produtos em Estoque" 
          value="8,742" 
          icon={<BoxesIcon size={24} className="text-white" />} 
          color="bg-success-500"
        />
        <StatCard 
          title="Expedições Hoje" 
          value={18} 
          icon={<TruckIcon size={24} className="text-white" />} 
          color="bg-secondary-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-bold mb-4">Desempenho Semanal</h2>
          <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded">
            <p className="text-gray-500">Gráfico de desempenho estaria aqui</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Equipe Ativa</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <Users size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium">Ricardo Oliveira</p>
                <p className="text-sm text-gray-500">Separação - Setor A</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <Users size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium">Mariana Silva</p>
                <p className="text-sm text-gray-500">Conferência - Entrada</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <Users size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium">Carlos Santos</p>
                <p className="text-sm text-gray-500">Expedição</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <Users size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium">Juliana Costa</p>
                <p className="text-sm text-gray-500">Inventário</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Alertas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AlertCard 
            title="Produtos com Baixo Estoque" 
            count={15} 
            type="warning"
          />
          <AlertCard 
            title="Pedidos Atrasados" 
            count={7} 
            type="danger"
          />
          <AlertCard 
            title="NFs Pendentes de Conferência" 
            count={12} 
            type="warning"
          />
          <AlertCard 
            title="Inventário Pendente" 
            count={3} 
            type="danger"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Atividades Recentes</h2>
          <button className="text-primary-500 hover:underline text-sm font-medium">
            Ver Todas
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Willams</td>
                <td className="px-6 py-4 whitespace-nowrap">Cadastrou</td>
                <td className="px-6 py-4 whitespace-nowrap">Pedido #12345</td>
                <td className="px-6 py-4 whitespace-nowrap">Hoje, 14:32</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Ricardo</td>
                <td className="px-6 py-4 whitespace-nowrap">Separou</td>
                <td className="px-6 py-4 whitespace-nowrap">Pedido #12342</td>
                <td className="px-6 py-4 whitespace-nowrap">Hoje, 14:15</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Mariana</td>
                <td className="px-6 py-4 whitespace-nowrap">Conferiu</td>
                <td className="px-6 py-4 whitespace-nowrap">NF #89765</td>
                <td className="px-6 py-4 whitespace-nowrap">Hoje, 13:50</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Carlos</td>
                <td className="px-6 py-4 whitespace-nowrap">Expediu</td>
                <td className="px-6 py-4 whitespace-nowrap">Pedido #12339</td>
                <td className="px-6 py-4 whitespace-nowrap">Hoje, 13:22</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Juliana</td>
                <td className="px-6 py-4 whitespace-nowrap">Atualizou</td>
                <td className="px-6 py-4 whitespace-nowrap">Inventário Setor B</td>
                <td className="px-6 py-4 whitespace-nowrap">Hoje, 11:45</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}