import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeCard from "@/components/card/Recipe";
import RecipeCardSkeleton from "@/components/skeleton/RecipeCardSkeleton";
import { useRecipes } from "@/hooks/useRecipes";
import MainLayout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RecipeSearchBar from "@/components/RecipeSearchBar";
import HeroSection from "@/components/landing-page/Hero";

const ITEMS_PER_PAGE = 6;

export default function RecipeList() {
  const { recipes, loading, error } = useRecipes();
  const [searchParams, setSearchParams] = useSearchParams();

  // Query params
  const query = searchParams.get("query") || "";
  const page = Math.max(parseInt(searchParams.get("page")) || 1, 1);

  // Filter and paginate
  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) =>
      r.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [recipes, query]);

  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handlers
  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setSearchParams({ query: newQuery, page: "1" });
  };

  const goToPage = (newPage) => {
    setSearchParams((prev) => {
      const q = prev.get("query") || "";
      return { query: q, page: newPage.toString() };
    });
  };

  return (
    <MainLayout>
      <HeroSection
        title="Explore Our Recipe Collection"
        subtitle="Find your favorite dishes and get inspired to cook something new today!"
        ctaText="See All Recipes"
        // ctaLink="/recipes#all-recipes"
        images={[
          "/images/kitchen1.jpg",
          "/images/kitchen2.jpg",
          "/images/kitchen3.jpeg",
        ]}
      />

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6" id="all-recipes">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-secondary-foreground">
            All Recipes
          </h2>

          {/* Search Bar */}
          <RecipeSearchBar value={query} onChange={handleSearch} />

          {/* Recipe Cards */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <RecipeCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">
              Error: {error.message}
            </div>
          ) : paginatedRecipes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-10 max-w-md mx-auto">
                  <p className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary border-primary"
                      onClick={() => goToPage(Math.max(page - 1, 1))}
                      disabled={page === 1}
                    >
                      Prev
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary border-primary"
                      onClick={() => goToPage(Math.min(page + 1, totalPages))}
                      disabled={page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-secondary-foreground mt-10">
              No recipes found.
            </p>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
