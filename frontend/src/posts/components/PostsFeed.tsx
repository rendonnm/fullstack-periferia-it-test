import { PostCard } from "./PostCard";
import { LoadingState } from "./states/LoadingState";
import { ErrorState } from "./states/ErrorState";
import { EmptyState } from "./states/EmptyState";
import type { Post } from "../types/post";

interface PostsFeedProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export function PostsFeed({ posts, loading, error }: PostsFeedProps) {
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
