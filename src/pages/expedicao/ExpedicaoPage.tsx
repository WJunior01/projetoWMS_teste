import { Link } from 'react-router-dom';
import { Truck, Package, ClipboardCheck } from 'lucide-react';

interface ExpedicaoCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  count: number;
}

function ExpedicaoCard({ title, icon, description, link, count }: ExpedicaoCardProps) {
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

export default function ExpedicaoPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Expedição</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ExpedicaoCard
          title="Brid Expedição"
          icon={<Truck size={24} />}
          description="Gerencie as expedições em andamento."
          link="/expedicao/brid"
          count={32}
        />
        
        <ExpedicaoCard
          title="Coleta"
          icon={<Package size={24} />}
          description="Acompanhe e gerencie as coletas programadas."
          link="/expedicao/coleta"
          count={15}
        />
        
        <ExpedicaoCard
          title="Brid Encerrado"
          icon={<ClipboardCheck size={24} />}
          description="Histórico de expedições encerradas."
          link="/expedicao/encerrado"
          count={248}
        />
      </div>
    </div>
  );
}