import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from '../../components/ui/Toaster';
import { KeyRound, User } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast('Por favor, preencha todos os campos', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      toast('Credenciais inválidas', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="flex items-center gap-2 mb-2 font-medium">
            <User size={18} />
            Usuário:
          </label>
          <input
            id="email"
            type="text"
            className="input"
            placeholder="Digite seu usuário ou email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="flex items-center gap-2 mb-2 font-medium">
            <KeyRound size={18} />
            Senha:
          </label>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="Digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full uppercase font-bold py-3"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'LOGIN'}
        </button>
        
        <div className="mt-4 text-center">
          <a href="#" className="text-primary-500 hover:underline text-sm">
            Esqueceu a senha? Clique aqui
          </a>
        </div>
      </form>
    </div>
  );
}