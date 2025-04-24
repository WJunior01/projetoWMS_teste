import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import { useAuth } from './contexts/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import PedidosPage from './pages/pedidos/PedidosPage';
import SolicitacaoPage from './pages/pedidos/SolicitacaoPage';
import PedidosVendaPage from './pages/pedidos/PedidosVendaPage';
import RecebimentoPage from './pages/recebimento/RecebimentoPage';
import NfsRecebidasPage from './pages/recebimento/NfsRecebidasPage';
import EstoquePage from './pages/estoque/EstoquePage';
import ExpedicaoPage from './pages/expedicao/ExpedicaoPage';
import InventarioPage from './pages/inventario/InventarioPage';
import RelatoriosPage from './pages/relatorios/RelatoriosPage';
import EquipePage from './pages/equipe/EquipePage';
import EmpresaPage from './pages/empresa/EmpresaPage';
import ArmazemPage from './pages/armazem/ArmazemPage';
import SuportePage from './pages/suporte/SuportePage';

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route 
          element={
            isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Pedidos Routes */}
          <Route path="/pedidos" element={<PedidosPage />} />
          <Route path="/pedidos/solicitacao" element={<SolicitacaoPage />} />
          <Route path="/pedidos/venda" element={<PedidosVendaPage />} />
          
          {/* Recebimento Routes */}
          <Route path="/recebimento" element={<RecebimentoPage />} />
          <Route path="/recebimento/nfs" element={<NfsRecebidasPage />} />
          
          {/* Estoque Routes */}
          <Route path="/estoque" element={<EstoquePage />} />
          
          {/* Expedição Routes */}
          <Route path="/expedicao" element={<ExpedicaoPage />} />
          
          {/* Other Routes */}
          <Route path="/inventario" element={<InventarioPage />} />
          <Route path="/relatorios" element={<RelatoriosPage />} />
          <Route path="/equipe" element={<EquipePage />} />
          <Route path="/empresa" element={<EmpresaPage />} />
          <Route path="/armazem" element={<ArmazemPage />} />
          <Route path="/suporte" element={<SuportePage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;