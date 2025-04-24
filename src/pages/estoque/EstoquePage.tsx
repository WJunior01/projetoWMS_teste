import { Link } from 'react-router-dom';
import { Boxes, ArrowLeftRight, Scissors, Combine } from 'lucide-react';

interface EstoqueCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  count: number;
}

function EstoqueCard({ title, icon, description, link, count }: EstoqueCardProps) {
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

export default function EstoquePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Estoque</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EstoqueCard
          title="Consulta Estoque"
          icon={<Boxes size={24} />}
          description="Consulte o estoque atual, localizações e disponibilidade."
          link="/estoque/consulta"
          count={8742}
        />
        
        <EstoqueCard
          title="Movimentação"
          icon={<ArrowLeftRight size={24} />}
          description="Realize movimentações entre endereços do estoque."
          link="/estoque/movimentacao"
          count={156}
        />
        
        <EstoqueCard
          title="Fracionar IRC"
          icon={<Scissors size={24} />}
          description="Fracione IRCs para melhor gestão do estoque."
          link="/estoque/fracionar"
          count={24}
        />
        
        <EstoqueCard
          title="Unir IRC"
          icon={<Combine size={24} />}
          description="Una IRCs para otimizar o espaço no estoque."
          link="/estoque/unir"
          count={18}
        />
      </div>
    </div>
  );
}