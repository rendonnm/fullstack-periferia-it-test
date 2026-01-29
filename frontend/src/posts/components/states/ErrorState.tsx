interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="bg-red-50 rounded-xl shadow-md p-12 text-center">
      <p className="text-red-600 text-lg">{message}</p>
    </div>
  );
}
