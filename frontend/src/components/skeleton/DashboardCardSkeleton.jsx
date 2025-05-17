export default function DashboardCardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-6 w-6 bg-gray-300 rounded-full" />
      </div>
      <div className="h-8 w-1/4 bg-gray-300 rounded mb-2" />
      <div className="h-4 w-2/3 bg-gray-200 rounded" />
    </div>
  );
}
