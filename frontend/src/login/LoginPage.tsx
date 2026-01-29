import { LoginForm } from "./components/LoginForm";

export function LoginPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Iniciar sesión
          </h1>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
