// src/pages/dashboard/DashboardPage.tsx
import { useState, useEffect } from "react";
import {
  LayoutGrid,
  Package,
  BoxesIcon,
  TruckIcon,
  Users,
  AlertTriangle,
  BarChart4,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "../../components/ui/Toaster";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  percentChange?: number;
}

function StatCard({ title, value, icon, color, percentChange }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className={`mr-4 p-3 rounded-full ${color}`}>{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">{value}</p>
          {percentChange !== undefined && (
            <span
              className={`text-sm font-medium flex items-center ${
                percentChange >= 0 ? "text-success-600" : "text-danger-600"
              }`}
            >
              {percentChange >= 0 ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingUp size={16} className="mr-1 transform rotate-180" />
              )}
              {Math.abs(percentChange)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface AlertCardProps {
  title: string;
  count: number;
  type: "warning" | "danger";
  onClick?: () => void;
}

function AlertCard({ title, count, type, onClick }: AlertCardProps) {
  const bgColor = type === "warning" ? "bg-warning-50" : "bg-danger-50";
  const borderColor =
    type === "warning" ? "border-warning-500" : "border-danger-500";
  const textColor = type === "warning" ? "text-warning-700" : "text-danger-700";

  return (
    <div
      className={`${bgColor} ${borderColor} border-l-4 p-4 rounded-r-lg cursor-pointer hover:shadow-md transition-shadow`}
      onClick={onClick}
    >
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

interface PerformanceChartProps {
  data: {
    label: string;
    recebimento: number;
    expedicao: number;
  }[];
}

function PerformanceChart({ data }: PerformanceChartProps) {
  // Em um projeto real, você usaria uma biblioteca de gráficos como Chart.js, Recharts, etc.
  // Para esta demonstração, vamos simular uma visualização básica

  const maxValue = Math.max(
    ...data.flatMap((d) => [d.recebimento, d.expedicao])
  );

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
          <span className="text-sm">Recebimento</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
          <span className="text-sm">Expedição</span>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm text-gray-500">
                Rec: {item.recebimento} | Exp: {item.expedicao}
              </span>
            </div>
            <div className="flex w-full h-6">
              <div
                className="bg-primary-500 h-full rounded-l-sm"
                style={{ width: `${(item.recebimento / maxValue) * 100}%` }}
              ></div>
              <div
                className="bg-secondary-500 h-full rounded-r-sm"
                style={{ width: `${(item.expedicao / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface EquipeAtivaProps {
  membros: Array<{
    nome: string;
    setor: string;
    horario: string;
    status: "online" | "ausente" | "ocupado";
  }>;
}

function EquipeAtiva({ membros }: EquipeAtivaProps) {
  const getStatusColor = (status: "online" | "ausente" | "ocupado") => {
    switch (status) {
      case "online":
        return "bg-success-500";
      case "ausente":
        return "bg-warning-500";
      case "ocupado":
        return "bg-danger-500";
    }
  };

  return (
    <div className="space-y-4">
      {membros.map((membro, index) => (
        <div key={index} className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
            <Users size={20} className="text-primary-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <p className="font-medium">{membro.nome}</p>
              <div
                className={`ml-2 w-2 h-2 rounded-full ${getStatusColor(
                  membro.status
                )}`}
              ></div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span>{membro.setor}</span>
              <span className="mx-2">•</span>
              <Clock size={14} className="mr-1" />
              <span>{membro.horario}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Dados simulados para o gráfico de desempenho
  const performanceData = [
    { label: "Segunda", recebimento: 42, expedicao: 35 },
    { label: "Terça", recebimento: 38, expedicao: 40 },
    { label: "Quarta", recebimento: 45, expedicao: 32 },
    { label: "Quinta", recebimento: 50, expedicao: 45 },
    { label: "Sexta", recebimento: 55, expedicao: 60 },
    { label: "Sábado", recebimento: 25, expedicao: 30 },
    { label: "Domingo", recebimento: 10, expedicao: 5 },
  ];

  // Dados simulados para equipe ativa
  const equipeMembros = [
    {
      nome: "Ricardo Oliveira",
      setor: "Separação - Setor A",
      horario: "08:00 - 17:00",
      status: "online" as const,
    },
    {
      nome: "Mariana Silva",
      setor: "Conferência - Entrada",
      horario: "08:30 - 17:30",
      status: "ocupado" as const,
    },
    {
      nome: "Carlos Santos",
      setor: "Expedição",
      horario: "09:00 - 18:00",
      status: "online" as const,
    },
    {
      nome: "Juliana Costa",
      setor: "Inventário",
      horario: "08:00 - 17:00",
      status: "ausente" as const,
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
          <p>Carregando informações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Bem-vindo, {user?.name}! Confira o resumo do seu armazém.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Pedidos Pendentes"
          value={24}
          icon={<Package size={24} className="text-white" />}
          color="bg-primary-500"
          percentChange={12}
        />
        <StatCard
          title="NFs Recebidas Hoje"
          value={12}
          icon={<Package size={24} className="text-white" />}
          color="bg-info-500"
          percentChange={-5}
        />
        <StatCard
          title="Produtos em Estoque"
          value="8,742"
          icon={<BoxesIcon size={24} className="text-white" />}
          color="bg-success-500"
          percentChange={3}
        />
        <StatCard
          title="Expedições Hoje"
          value={18}
          icon={<TruckIcon size={24} className="text-white" />}
          color="bg-secondary-500"
          percentChange={8}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Desempenho Semanal</h2>
            <div className="flex items-center gap-2">
              <button className="text-sm font-medium text-primary-500 hover:underline">
                Esta Semana
              </button>
              <span className="text-gray-300">|</span>
              <button className="text-sm font-medium text-gray-500 hover:text-primary-500">
                Mês Anterior
              </button>
            </div>
          </div>

          <PerformanceChart data={performanceData} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Equipe Ativa</h2>
            <button className="text-primary-500 hover:underline text-sm font-medium">
              Ver Todos
            </button>
          </div>

          <EquipeAtiva membros={equipeMembros} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Alertas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AlertCard
            title="Produtos com Baixo Estoque"
            count={15}
            type="warning"
            onClick={() =>
              toast(
                "Redirecionando para a página de produtos com baixo estoque...",
                "info"
              )
            }
          />
          <AlertCard
            title="Pedidos Atrasados"
            count={7}
            type="danger"
            onClick={() =>
              toast(
                "Redirecionando para a página de pedidos atrasados...",
                "info"
              )
            }
          />
          <AlertCard
            title="NFs Pendentes de Conferência"
            count={12}
            type="warning"
            onClick={() =>
              toast(
                "Redirecionando para a página de notas fiscais pendentes...",
                "info"
              )
            }
          />
          <AlertCard
            title="Inventário Pendente"
            count={3}
            type="danger"
            onClick={() =>
              toast(
                "Redirecionando para a página de inventário pendente...",
                "info"
              )
            }
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
                <td className="px-6 py-4 whitespace-nowrap">
                  Inventário Setor B
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Hoje, 11:45</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
