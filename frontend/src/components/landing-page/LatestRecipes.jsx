import RecipeCard from "../card/Recipe";
import { useRecipes } from "@/hooks/useRecipes";

export default function LatestRecipes() {
  const { recipes, loading, error } = useRecipes();

  const latestThree = recipes.slice(14, 17);

  return (
    <section className="py-16 bg-gradient-to-b from-secondary/80 via-secondary to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
              Fresh from the kitchen
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground">
              Latest Recipes
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Handpicked dishes added recently. Start with these if you need instant inspiration.
            </p>
          </div>
          <a
            href="/recipes"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition"
          >
            Browse all recipes →
          </a>
        </div>

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
