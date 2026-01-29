import type { Post } from "../types/post";
import { API_ENDPOINTS } from "../../config/api";
import { useAuthStore } from "../../stores/authStore";

function getAuthHeaders() {
  const token = useAuthStore.getState().token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export interface CreatePostData {
  title?: string;
  message: string;
}

export async function getPosts(): Promise<Post[]> {
  const url = new URL("posts", API_ENDPOINTS.POST_SERVICE);
  const res = await fetch(url.href, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Error al obtener los posts");
  }

  return res.json();
}

export async function createPost(data: CreatePostData): Promise<Post> {
  const url = new URL("posts", API_ENDPOINTS.POST_SERVICE);
  const res = await fetch(url.href, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al crear el post");
  }

  return res.json();
}
