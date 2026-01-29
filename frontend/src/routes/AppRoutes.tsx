import { Routes, Route } from "react-router";
import { LoginPage } from "../login/LoginPage";
import { PostMain } from "../posts/PostMain";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/posts" element={<PostMain />} />
    </Routes>
  );
}