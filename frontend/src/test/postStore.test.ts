import { describe, it, expect, beforeEach } from "vitest";
import { usePostStore } from "../stores/postStore";
import type { Post } from "../posts/types/post";

describe("postStore", () => {
  beforeEach(() => {
    usePostStore.setState({
      posts: [],
      loading: false,
      error: null,
    });
  });

  const mockPost: Post = {
    id: "1",
    userId: "user1",
    username: "testuser",
    title: "Test Post",
    message: "This is a test post",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it("should initialize with empty state", () => {
    const { posts, loading, error } = usePostStore.getState();

    expect(posts).toEqual([]);
    expect(loading).toBe(false);
    expect(error).toBeNull();
  });

  it("should set posts", () => {
    const { setPosts } = usePostStore.getState();
    const testPosts = [mockPost];

    setPosts(testPosts);

    const { posts } = usePostStore.getState();
    expect(posts).toEqual(testPosts);
  });

  it("should add post to the beginning of the list", () => {
    const { setPosts, addPost } = usePostStore.getState();
    const existingPost = { ...mockPost, id: "2", title: "Existing Post" };

    setPosts([existingPost]);

    const newPost = { ...mockPost, id: "1", title: "New Post" };
    addPost(newPost);

    const { posts } = usePostStore.getState();
    expect(posts).toHaveLength(2);
    expect(posts[0]).toEqual(newPost);
    expect(posts[1]).toEqual(existingPost);
  });

  it("should set loading state", () => {
    const { setLoading } = usePostStore.getState();

    setLoading(true);
    expect(usePostStore.getState().loading).toBe(true);

    setLoading(false);
    expect(usePostStore.getState().loading).toBe(false);
  });

  it("should set error", () => {
    const { setError } = usePostStore.getState();
    const errorMessage = "Test error";

    setError(errorMessage);
    expect(usePostStore.getState().error).toBe(errorMessage);

    setError(null);
    expect(usePostStore.getState().error).toBeNull();
  });
});
