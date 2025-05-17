export default function RecipeCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
      {/* Skeleton Gambar */}
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-300" />
      </div>

      {/* Skeleton Konten */}
      <div className="p-4 flex flex-col gap-2">
        {/* Judul */}
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        {/* Deskripsi */}
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />

        {/* Metadata */}
        <div className="mt-auto flex justify-between items-center text-xs pt-2">
          <div className="h-4 bg-gray-300 rounded w-1/4" />
          <div className="h-4 bg-gray-300 rounded w-1/5" />
        </div>
      </div>
    </div>
  );
}
