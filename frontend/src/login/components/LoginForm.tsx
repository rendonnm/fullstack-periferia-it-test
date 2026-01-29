import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const { error, loading, handleLogin } = useLogin();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const params = new FormData(e.target as HTMLFormElement);
        const user = params.get("user");
        const password = params.get("password");
        if (!user || !password) return;
        handleLogin({
          user: user.toString(),
          password: password.toString(),
        });
      }}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="user"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nombre de usuario
        </label>
        <input
          type="text"
          name="user"
          id="user"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors outline-none"
          placeholder="Ingresa tu usuario"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors outline-none"
          placeholder="Ingresa tu contraseña"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
