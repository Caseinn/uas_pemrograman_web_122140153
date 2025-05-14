import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "@/components/card/Recipe";
import { useRecipes } from "@/hooks/useRecipes";
import MainLayout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 6;

export default function RecipeList() {
  const { recipes, loading, error } = useRecipes();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

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

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(1); // Reset to page 1 on new search
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-12">
        Error: {error.message}
      </div>
    );
  }

  return (
    <MainLayout>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
            All Recipes
          </h2>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <Input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search recipes..."
              className="border-primary focus-visible:ring-primary"
            />
          </div>

          {/* Recipes */}
          {paginatedRecipes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedRecipes.map((recipe) => (
                  <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                    <RecipeCard recipe={recipe} />
                  </Link>
                ))}
              </div>

              {/* Pagination Controls */}
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
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      disabled={page === 1}
                    >
                      Prev
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary border-primary"
                      onClick={() =>
                        setPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-muted-foreground mt-10">
              No recipes found.
            </p>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
