// src/components/navigation/Header.tsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  UserCircle,
  Bell,
  Search,
  Menu,
  X,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "../../utils/cn";

interface NotificationType {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function Header() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: "1",
      title: "Novo pedido recebido",
      message: "O pedido #12345 foi recebido e está aguardando separação.",
      time: "5 min atrás",
      read: false,
    },
    {
      id: "2",
      title: "Produto com estoque baixo",
      message: "O produto PROD-1234 está com estoque abaixo do mínimo.",
      time: "30 min atrás",
      read: false,
    },
    {
      id: "3",
      title: "Inventário finalizado",
      message: "O inventário do setor A foi finalizado com sucesso.",
      time: "2 horas atrás",
      read: true,
    },
  ]);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Fechar menus ao clicar fora deles
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Buscando por: ${searchQuery}`);
    setSearchQuery("");
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-primary-500 h-16 px-4 flex items-center justify-between shadow-md z-10">
      {/* Botão do menu mobile */}
      <button
        className="md:hidden text-white"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Logo para mobile */}
      <div className="md:hidden">
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold text-xl"
        >
          GIROWMS
        </Link>
      </div>

      {/* Barra de pesquisa (oculta em mobile) */}
      <div className="hidden md:flex flex-1 justify-center">
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
          <input
            type="text"
            placeholder="Buscar produtos, pedidos, notas fiscais..."
            className="input pr-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Ícones e menu do usuário */}
      <div className="flex items-center gap-4">
        {/* Notificações */}
        <div className="relative" ref={notificationsRef}>
          <button
            className="relative text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-danger-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-20">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-medium">Notificações</h3>
                {unreadCount > 0 && (
                  <button
                    className="text-sm text-primary-500 hover:text-primary-600"
                    onClick={markAllAsRead}
                  >
                    Marcar todas como lidas
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 border-b last:border-0 hover:bg-gray-50 cursor-pointer",
                        !notification.read && "bg-primary-50"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{notification.title}</h4>
                        <button
                          className="text-gray-400 hover:text-danger-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.time}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    Nenhuma notificação
                  </div>
                )}
              </div>

              <div className="p-2 border-t text-center">
                <Link
                  to="/notificacoes"
                  className="text-sm text-primary-500 hover:text-primary-600"
                  onClick={() => setShowNotifications(false)}
                >
                  Ver todas as notificações
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Perfil do usuário */}
        <div className="relative" ref={userMenuRef}>
          <button
            className="flex items-center gap-2 text-white hover:bg-white/10 rounded-full transition-colors p-1"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <span className="hidden md:inline-block">{user?.name}</span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <UserCircle size={24} />
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20">
              <div className="p-4 border-b">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <ul>
                <li>
                  <Link
                    to="/perfil"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User size={18} className="text-gray-500" />
                    <span>Meu Perfil</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/configuracoes"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings size={18} className="text-gray-500" />
                    <span>Configurações</span>
                  </Link>
                </li>
                <li className="border-t">
                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-danger-600"
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                  >
                    <LogOut size={18} />
                    <span>Sair</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white h-full w-4/5 max-w-xs overflow-y-auto">
            <div className="p-4 bg-primary-500 text-white flex justify-between items-center">
              <h2 className="font-bold text-xl">Menu</h2>
              <button onClick={() => setShowMobileMenu(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              <form onSubmit={handleSearch} className="mb-4 relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="input pr-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <Search size={20} />
                </button>
              </form>

              <nav className="space-y-2">
                <Link
                  to="/dashboard"
                  className="block py-2 px-4 rounded hover:bg-gray-100"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Dashboard
                </Link>
                {/* Adicione aqui os outros links de navegação */}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
