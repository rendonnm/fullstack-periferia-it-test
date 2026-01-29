import { API_ENDPOINTS } from "../../config/api";

interface LogPayload {
  user: string;
  password: string;
}

export async function loginUser({ user, password }: LogPayload) {
  const url = new URL("auth/login", API_ENDPOINTS.AUTH_SERVICE);
  const res = await fetch(url.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: user, password }),
  });

  if (!res.ok) {
    throw new Error("Ha ocurrido un error");
  }

  const data = await res.json();
  if (data["access_token"]) {
    localStorage.setItem("token", data["access_token"]);
    return true;
  }
  return false;
}
