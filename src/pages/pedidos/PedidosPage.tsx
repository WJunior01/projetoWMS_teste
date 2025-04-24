import { Link } from 'react-router-dom';
import { ShoppingCart, ListFilter, ClipboardCheck, PackageCheck, ClipboardList } from 'lucide-react';

interface PedidoCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  count: number;
}

function PedidoCard({ title, icon, description, link, count }: PedidoCardProps) {
  return (
    <Link 
      to={link}
      className="bg-white rounded-lg shadow p-6 flex flex-col hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-100 rounded-full text-primary-600">
            {icon}
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <span className="text-2xl font-bold text-primary-500">{count}</span>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mt-auto">
        <span className="text-primary-500 font-medium hover:underline">
          Acessar &rarr;
        </span>
      </div>
    </Link>
  );
}

export default function PedidosPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pedidos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PedidoCard
          title="Solicitação"
          icon={<ShoppingCart size={24} />}
          description="Gerencie as solicitações de pedidos, importe XMLs e crie novas ondas."
          link="/pedidos/solicitacao"
          count={24}
        />
        
        <PedidoCard
          title="Pedidos de Venda"
          icon={<ListFilter size={24} />}
          description="Visualize e gerencie os pedidos de venda em andamento."
          link="/pedidos/venda"
          count={42}
        />
        
        <PedidoCard
          title="Separação"
          icon={<ClipboardList size={24} />}
          description="Acompanhe e gerencie as separações de pedidos em andamento."
          link="/pedidos/separacao"
          count={18}
        />
        
        <PedidoCard
          title="Conferência Ped."
          icon={<ClipboardCheck size={24} />}
          description="Confira os pedidos separados antes da expedição."
          link="/pedidos/conferencia"
          count={15}
        />
        
        <PedidoCard
          title="Encerrados Ped."
          icon={<PackageCheck size={24} />}
          description="Histórico de pedidos já encerrados e expedidos."
          link="/pedidos/encerrados"
          count={153}
        />
      </div>
    </div>
  );
}