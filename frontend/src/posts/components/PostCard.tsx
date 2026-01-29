import type { Post } from "../types/post";
import { UserAvatar } from "./UserAvatar";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex gap-4">
        <UserAvatar username={post.username} />

        <div className="flex-1 min-w-0">
          <PostHeader username={post.username} createdAt={post.createdAt} />
          <PostContent title={post.title} message={post.message} />
        </div>
      </div>
    </article>
  );
}
