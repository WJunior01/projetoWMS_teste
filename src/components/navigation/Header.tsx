import { useAuth } from '../../contexts/AuthContext';
import { UserCircle } from 'lucide-react';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-primary-500 h-16 px-4 flex items-center justify-between">
      <div className="flex-1"></div>
      <div className="flex items-center gap-2 text-white">
        <span>olá, {user?.name}</span>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <UserCircle size={24} />
        </div>
      </div>
    </header>
  );
}