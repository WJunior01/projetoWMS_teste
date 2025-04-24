import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Boxes, 
  Truck, 
  ClipboardList, 
  LineChart, 
  Users, 
  Building2, 
  Warehouse, 
  HeadphonesIcon,
  ChevronDown
} from 'lucide-react';
import Logo from './Logo';
import { cn } from '../../utils/cn';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  subItems?: Array<{ to: string; label: string }>;
  active?: boolean;
}

function NavItem({ to, icon, label, subItems, active }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(active && subItems?.length ? true : false);

  const handleToggle = () => {
    if (subItems?.length) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-secondary-400 transition-colors cursor-pointer",
          active && !subItems?.length && "bg-secondary-400 text-white font-medium"
        )}
        onClick={handleToggle}
      >
        <span className="text-white">{icon}</span>
        {subItems?.length ? (
          <div className="flex items-center justify-between w-full">
            <span>{label}</span>
            <ChevronDown 
              size={16} 
              className={cn(
                "transition-transform", 
                isOpen && "transform rotate-180"
              )} 
            />
          </div>
        ) : (
          <Link to={to} className="w-full">
            {label}
          </Link>
        )}
      </div>

      {subItems?.length && isOpen && (
        <div className="pl-12 bg-secondary-400/30">
          {subItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "block py-2 text-white/70 hover:text-white transition-colors",
                active && to === item.to && "text-white font-medium"
              )}
            >
              <span className="text-xs">•</span> {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const pathName = location.pathname;

  const navItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      to: "/pedidos",
      icon: <ShoppingCart size={20} />,
      label: "Pedidos",
      subItems: [
        { to: "/pedidos/solicitacao", label: "Solicitação" },
        { to: "/pedidos/venda", label: "Pedidos de Venda" },
        { to: "/pedidos/separacao", label: "Separação" },
        { to: "/pedidos/conferencia", label: "Conferência Ped." },
        { to: "/pedidos/encerrados", label: "Encerrados Ped." },
      ],
    },
    {
      to: "/recebimento",
      icon: <Package size={20} />,
      label: "Recebimento",
      subItems: [
        { to: "/recebimento/nfs", label: "NF's Recebidas" },
        { to: "/recebimento/conferencia", label: "Conferência Recb." },
        { to: "/recebimento/encerrados", label: "Encerrados Recb." },
        { to: "/recebimento/irc-pendente", label: "IRC pendente Alocação" },
        { to: "/recebimento/alocacao", label: "Alocação IRC" },
      ],
    },
    {
      to: "/estoque",
      icon: <Boxes size={20} />,
      label: "Estoque",
      subItems: [
        { to: "/estoque/consulta", label: "Consulta Estoque" },
        { to: "/estoque/movimentacao", label: "Movimentação" },
        { to: "/estoque/fracionar", label: "Fracionar IRC" },
        { to: "/estoque/unir", label: "Unir IRC" },
      ],
    },
    {
      to: "/expedicao",
      icon: <Truck size={20} />,
      label: "Expedição",
      subItems: [
        { to: "/expedicao/brid", label: "Brid Expedição" },
        { to: "/expedicao/coleta", label: "Coleta" },
        { to: "/expedicao/encerrado", label: "Brid Encerrado" },
      ],
    },
    {
      to: "/inventario",
      icon: <ClipboardList size={20} />,
      label: "Inventário",
    },
    {
      to: "/relatorios",
      icon: <LineChart size={20} />,
      label: "Relatórios",
    },
    {
      to: "/equipe",
      icon: <Users size={20} />,
      label: "Equipe",
    },
    {
      to: "/empresa",
      icon: <Building2 size={20} />,
      label: "Empresa",
    },
    {
      to: "/armazem",
      icon: <Warehouse size={20} />,
      label: "Armazém",
    },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.to === pathName) {
      return true;
    }
    
    if (item.subItems) {
      return item.subItems.some(subItem => subItem.to === pathName);
    }
    
    return false;
  };

  return (
    <aside className="bg-secondary-500 w-64 h-full flex flex-col">
      <div className="p-4 flex items-center justify-center">
        <Logo />
      </div>
      
      <div className="px-4 py-2 bg-secondary-600 text-white font-medium">
        MENU
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            subItems={item.subItems}
            active={isActive(item)}
          />
        ))}
      </nav>
      
      <div className="border-t border-secondary-400 mt-auto">
        <NavItem
          to="/suporte"
          icon={<HeadphonesIcon size={20} />}
          label="Suporte"
        />
      </div>
    </aside>
  );
}