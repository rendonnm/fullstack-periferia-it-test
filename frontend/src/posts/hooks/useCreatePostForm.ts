import { useState } from "react";

interface UseCreatePostFormProps {
  onSubmit: (title: string, content: string) => Promise<void>;
  maxLength?: number;
}

export function useCreatePostForm({
  onSubmit,
  maxLength = 280,
}: UseCreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid =
    title.trim().length > 0 &&
    content.trim().length > 0 &&
    content.length <= maxLength;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(title, content);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error al publicar:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return {
    title,
    content,
    isSubmitting,
    isValid,
    maxLength,
    handleSubmit,
    handleTitleChange,
    handleContentChange,
  };
}
