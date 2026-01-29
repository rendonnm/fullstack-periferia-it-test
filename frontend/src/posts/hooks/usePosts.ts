import { useState, useEffect } from "react";
import type { Post } from "../types/post";
import { getPosts } from "../service/posts";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError("Error al cargar los posts");
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    refreshPosts: loadPosts,
  };
}
