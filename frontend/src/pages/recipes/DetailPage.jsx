import { useParams } from "react-router-dom";
import { useRecipeById } from "@/hooks/useRecipes";
import { useComments } from "@/hooks/useComments";
import MainLayout from "@/components/Layout";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipe, loading, error } = useRecipeById(id);
  const user = useCurrentUser();

  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    createComment,
  } = useComments(id);

  const [newComment, setNewComment] = useState({
    comment_text: "",
    user_id: user ? user.id : null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.comment_text.trim()) {
      setErrorMessage("Komentar tidak boleh kosong.");
      return;
    }

    if (!user || !user.id || !id) {
      alert("User belum login atau resep belum dimuat.");
      return;
    }

    try {
      await createComment({
        recipe_id: parseInt(id),
        user_id: newComment.user_id,
        comment_text: newComment.comment_text,
      });
      setNewComment((prev) => ({ ...prev, comment_text: "" }));
      setErrorMessage("");
    } catch (err) {
      console.error("Failed to submit comment:", err.message);
      setErrorMessage("Gagal mengirim komentar. Coba lagi nanti.");
    }
  };

  useEffect(() => {
    if (user && !newComment.user_id) {
      setNewComment((prev) => ({ ...prev, user_id: user.id }));
    }
  }, [user, newComment.user_id]);

  if (loading) {
    return (
      <div className="py-12 text-center text-secondary-foreground">
        Loading recipe...
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="py-12 text-center text-secondary-foreground">
        <h2 className="text-xl font-semibold">
          {error ? `Error: ${error.message}` : "Recipe not found."}
        </h2>
        <p className="mt-2">
          <a href="/recipes" className="text-secondary hover:underline">
            Back to Recipes
          </a>
        </p>
      </div>
    );
  }

  const ingredients = recipe.ingredients?.split("\n") || [];
  const steps = recipe.steps?.split("\n") || [];
  const prepCount = steps.length || 0;
  const ingredientsCount = ingredients.length || 0;
  const titleInitial = recipe.title?.[0]?.toUpperCase() || "R";

  return (
    <MainLayout className="pt-12">
      {/* Recipe Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-secondary" />
        <div className="container mx-auto px-4 py-16 space-y-8 relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="/recipes"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
            >
              {"<"} Back to all recipes
            </a>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start">
            <article className="space-y-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative h-[360px] w-full">
                {recipe.image ? (
                  <>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                    No image available
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/25 px-3 py-1">
                        Featured
                      </span>
                      <span className="rounded-full bg-white/25 px-3 py-1">
                        Home style
                      </span>
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow">
                    {recipe.title}
                  </h1>
                  <p className="text-sm text-white/85 max-w-3xl leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6 p-6 sm:p-7">
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-xl bg-muted/50 px-4 py-3 border border-border/60">
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.12em]">
                      Journey
                    </p>
                    <p className="text-lg font-semibold text-secondary-foreground">
                      {prepCount} step walkthrough
                    </p>
                  </div>
                  <div className="rounded-xl bg-muted/50 px-4 py-3 border border-border/60">
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.12em]">
                      Pantry
                    </p>
                    <p className="text-lg font-semibold text-secondary-foreground">
                      {ingredientsCount} items
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-border px-4 py-5 shadow-sm">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    Steps
                  </h2>
                  <ol className="space-y-3 text-secondary-foreground/90">
                    {steps.map((step, index) => (
                      <li
                        key={index}
                        className="flex gap-3 rounded-xl border border-border/60 bg-white px-4 py-3"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-2xl bg-white border border-border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                <ul className="space-y-2 text-secondary-foreground/90">
                  {ingredients.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 rounded-xl bg-muted/50 px-3 py-2 border border-border/60"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white border border-border shadow-sm p-6 space-y-3">
                <h3 className="text-lg font-semibold">Looking for more?</h3>
                <p className="text-sm text-secondary-foreground/80">
                  Explore the full library to find similar recipes and inspiration.
                </p>
                <a
                  href="/recipes"
                  className="inline-flex w-fit items-center gap-2 text-primary hover:text-primary/90 font-semibold"
                >
                  Back to Recipes →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="border-t border-white/15 mx-auto px-4 pb-12 text-secondary-foreground relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>

          {commentsLoading && <p>Loading comments...</p>}

          {commentsError && (
            <p className="text-red-500">{commentsError.message}</p>
          )}

          {comments.length === 0 && !commentsLoading && (
            <p className="text-secondary-foreground">
              No comments yet. Be the first to comment!
            </p>
          )}

          <ul className="space-y-4 mb-8">
            {comments.map((comment) => (
              <li key={comment.id} className="border p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium capitalize">
                    {comment.user_name}
                  </span>
                  <span className="text-xs text-secondary-foreground">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm">{comment.comment_text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Comment Form */}
        <div className="max-w-5xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="p-4 border rounded-md shadow-sm bg-secondary space-y-4 relative z-0"
          >
            <h3 className="text-lg font-semibold">Leave a Comment</h3>
            <fieldset className="space-y-4" disabled={!user}>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium">
                  Comment
                </label>
                <Textarea
                  id="comment"
                  value={newComment.comment_text}
                  onChange={(e) =>
                    setNewComment((prev) => ({
                      ...prev,
                      comment_text: e.target.value,
                    }))
                  }
                  disabled={!user}
                  required
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm min-h-[100px] max-h-[600px]"
                />
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={!user}
                className="bg-primary text-white font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Comment
              </button>
            </fieldset>
          </form>
        </div>

        {!user && (
          <div className="max-w-5xl mx-auto mt-3 rounded-md border border-primary/30 bg-white p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-secondary-foreground/80">
              Sign in to join the discussion and add your cooking notes.
            </p>
            <a
              href="/login"
              className="bg-primary text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-primary/90 transition"
            >
              Login to Comment
            </a>
          </div>
        )}
      </section>
    </MainLayout>
  );
}
