export function LoadingState() {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
      <p className="text-gray-500 text-lg">Cargando posts...</p>
    </div>
  );
}
