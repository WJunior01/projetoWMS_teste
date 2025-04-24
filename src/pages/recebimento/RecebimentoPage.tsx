import { Link } from 'react-router-dom';
import { Package, ClipboardCheck, PackageCheck, ArrowDownToLine, ArrowRightLeft } from 'lucide-react';

interface RecebimentoCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  count: number;
}

function RecebimentoCard({ title, icon, description, link, count }: RecebimentoCardProps) {
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

export default function RecebimentoPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Recebimento</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecebimentoCard
          title="NF's Recebidas"
          icon={<Package size={24} />}
          description="Visualize e gerencie as notas fiscais recebidas."
          link="/recebimento/nfs"
          count={12}
        />
        
        <RecebimentoCard
          title="Conferência Recb."
          icon={<ClipboardCheck size={24} />}
          description="Confira os produtos recebidos contra as notas fiscais."
          link="/recebimento/conferencia"
          count={8}
        />
        
        <RecebimentoCard
          title="Encerrados Recb."
          icon={<PackageCheck size={24} />}
          description="Histórico de recebimentos já encerrados."
          link="/recebimento/encerrados"
          count={245}
        />
        
        <RecebimentoCard
          title="IRC pendente Alocação"
          icon={<ArrowDownToLine size={24} />}
          description="IRCs aguardando alocação no estoque."
          link="/recebimento/irc-pendente"
          count={15}
        />
        
        <RecebimentoCard
          title="Alocação IRC"
          icon={<ArrowRightLeft size={24} />}
          description="Gerencie a alocação de IRCs no estoque."
          link="/recebimento/alocacao"
          count={10}
        />
      </div>
    </div>
  );
}