import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../service/auth";
import { useAuthStore } from "../../stores/authStore";

interface LoginPayload {
  user: string;
  password: string;
}

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  async function handleLogin({ user, password }: LoginPayload) {
    setError(null);
    setLoading(true);

    try {
      if (!user || !password) {
        throw new Error("Completa todos los campos");
      }

      const token = await loginUser({ user, password });

      if (token) {
        setToken(token);
        navigate("/posts");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return {
    error,
    loading,
    handleLogin,
  };
}
