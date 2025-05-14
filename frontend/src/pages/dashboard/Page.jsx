import { Link } from "react-router-dom";
import { useRecipes } from "@/hooks/useRecipes";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function Dashboard() {
  const { recipes, loading, error } = useRecipes();

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        All Recipes Report
      </h1>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {recipe.description}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Duration: {recipe.duration}
            </p>
            <Link
              to={`/recipes/${recipe.id}`}
              className="text-sm text-primary hover:underline mt-2 inline-block"
            >
              View Detail →
            </Link>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
