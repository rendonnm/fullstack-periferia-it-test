import { CreatePost } from "./components/CreatePost";
import { PostsFeed } from "./components/PostsFeed";
import { usePosts } from "./hooks/usePosts";

export function PostMain() {
  const { posts, loading, error, createPost } = usePosts();

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 to-primary-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Inicio</h1>
            <button className="text-primary-500 hover:text-primary-600 font-semibold">
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <CreatePost onSubmit={createPost} />

        <div className="flex flex-col gap-4">
          <PostsFeed posts={posts} loading={loading} error={error} />
        </div>
      </main>
    </div>
  );
}
