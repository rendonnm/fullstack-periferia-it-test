import { useEffect } from "react";
import { getPosts, createPost as createPostService } from "../service/posts";
import { usePostStore } from "../../stores/postStore";

export function usePosts() {
  const { posts, loading, error, setPosts, addPost, setLoading, setError } =
    usePostStore();

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
      addPost(newPost);
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
