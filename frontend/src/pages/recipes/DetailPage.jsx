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

  return (
    <MainLayout className="relative">
      {/* Recipe Section */}
      <section className="py-32 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-96 object-cover rounded-lg shadow-md mb-6"
              />
            )}
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <p className="mb-6">{recipe.description}</p>

            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside mb-6 space-y-1">
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mb-2">Steps</h2>
            <ol className="list-decimal list-inside space-y-2">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <div className="mt-8 w-full flex justify-center items-center">
              <a
                href="/recipes"
                className="text-white px-4 py-2 hover:underline bg-primary rounded-full transition"
              >
                ← Back to Recipes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="mt-12 border-t border-white/15 pt-8 mx-auto px-4 pb-12 text-secondary-foreground relative">
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
          </form>
        </div>

        {!user && (
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary/80 to-transparent rounded-md flex items-center justify-center">
            <a
              href="/login"
              className="bg-white text-primary font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              Login to Comment
            </a>
          </div>
        )}
      </section>
    </MainLayout>
  );
}
