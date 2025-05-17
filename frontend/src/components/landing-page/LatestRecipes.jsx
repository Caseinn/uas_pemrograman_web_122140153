import RecipeCard from "../card/Recipe";
import { useRecipes } from "@/hooks/useRecipes";

export default function LatestRecipes() {
  const { recipes, loading, error } = useRecipes();

  const latestThree = recipes.slice(0, 3);

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-secondary-foreground">
          Latest Recipes
        </h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">
            Error loading recipes: {error.message}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestThree.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
