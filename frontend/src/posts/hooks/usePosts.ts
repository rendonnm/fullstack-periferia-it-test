import { useState, useEffect } from "react";
import type { Post } from "../types/post";
import { getPosts, createPost as createPostService } from "../service/posts";

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

  const createPost = async (title: string, content: string) => {
    try {
      const newPost = await createPostService({
        message: content,
        title: title || "",
      });
      setPosts([newPost, ...posts]);
    } catch (err) {
      console.error("Error creating post:", err);
      throw err;
    }
  };

  return {
    posts,
    loading,
    error,
    createPost,
    refreshPosts: loadPosts,
  };
}
