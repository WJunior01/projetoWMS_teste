// src/pages/auth/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "../../components/ui/Toaster";
import { KeyRound, User, Loader } from "lucide-react";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "E-mail ou usuário é obrigatório";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpar erro quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      // O erro já é tratado no contexto de autenticação
      console.error("Erro de login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-6">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="flex items-center gap-2 mb-2 font-medium"
          >
            <User size={18} />
            Usuário:
          </label>
          <input
            id="email"
            name="email"
            type="text"
            className={`input ${
              errors.email
                ? "border-danger-500 focus-visible:ring-danger-500"
                : ""
            }`}
            placeholder="Digite seu usuário ou email..."
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-danger-500">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="flex items-center gap-2 mb-2 font-medium"
          >
            <KeyRound size={18} />
            Senha:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`input ${
              errors.password
                ? "border-danger-500 focus-visible:ring-danger-500"
                : ""
            }`}
            placeholder="Digite sua senha..."
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-danger-500">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full uppercase font-bold py-3 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader size={18} className="animate-spin" />
              ENTRANDO...
            </>
          ) : (
            "LOGIN"
          )}
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
