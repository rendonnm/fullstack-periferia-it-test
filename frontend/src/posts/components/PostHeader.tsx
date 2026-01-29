import { formatRelativeDate } from "../utils/formatDate";

interface PostHeaderProps {
  username: string;
  createdAt: string;
}

export function PostHeader({ username, createdAt }: PostHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <h3 className="font-bold text-gray-900 hover:underline cursor-pointer">
        {username}
      </h3>
      <span className="text-gray-500 text-sm">@{username}</span>
      <span className="text-gray-400 text-sm">·</span>
      <span className="text-gray-500 text-sm">
        {formatRelativeDate(createdAt)}
      </span>
    </div>
  );
}
