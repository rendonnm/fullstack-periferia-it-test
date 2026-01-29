interface PostContentProps {
  title?: string;
  message: string;
}

export function PostContent({ title, message }: PostContentProps) {
  return (
    <div className="mb-4">
      {title && (
        <h4 className="font-semibold text-lg text-gray-900 mb-2">{title}</h4>
      )}
      <p className="text-gray-800 whitespace-pre-wrap wrap-break-word">
        {message}
      </p>
    </div>
  );
}
