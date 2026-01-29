interface UserAvatarProps {
  username: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-xl",
};

export function UserAvatar({ username, size = "md" }: UserAvatarProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold shrink-0`}
    >
      {username.charAt(0).toUpperCase()}
    </div>
  );
}
