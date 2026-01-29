import { Routes, Route, Navigate } from "react-router";
import { LoginPage } from "../login/LoginPage";
import { PostMain } from "../posts/PostMain";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuthStore } from "../stores/authStore";

export function AppRoutes() {
  const token = useAuthStore((state) => state.token);

  return (
    <Routes>
      <Route
        index
        element={token ? <Navigate to="/posts" replace /> : <LoginPage />}
      />
      <Route
        path="/posts"
        element={
          <ProtectedRoute>
            <PostMain />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
