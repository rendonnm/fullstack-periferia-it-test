import { UserAvatar } from "./UserAvatar";
import { useCreatePostForm } from "../hooks/useCreatePostForm";

interface CreatePostProps {
  onSubmit: (title: string, content: string) => Promise<void>;
}

export function CreatePost({ onSubmit }: CreatePostProps) {
  const {
    title,
    content,
    isSubmitting,
    isValid,
    maxLength,
    handleSubmit,
    handleTitleChange,
    handleContentChange,
  } = useCreatePostForm({ onSubmit });

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <UserAvatar username="TÚ" />
          <div className="flex-1 space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Título"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors outline-none"
            />
            <textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="¿Qué está pasando?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors outline-none resize-none"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {content.length}/{maxLength} caracteres
              </span>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200"
              >
                {isSubmitting ? "Publicando..." : "Publicar"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
