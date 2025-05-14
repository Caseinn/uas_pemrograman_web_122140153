import { useParams } from "react-router-dom";
import { useRecipes } from "@/hooks/useRecipes";
import { useComments } from "@/hooks/useComments";
import MainLayout from "@/components/Layout";
import { useState } from "react";

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipes, loading, error } = useRecipes();
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
  } = useComments(id);

  const recipe = recipes.find((r) => r.id === parseInt(id));

  const [newComment, setNewComment] = useState({
    name: "",
    comment: "",
  });
  const [allComments, setAllComments] = useState(comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.comment) return;

    const newEntry = {
      id: Date.now(),
      recipeId: Number(id),
      name: newComment.name,
      comment: newComment.comment,
      createdAt: new Date().toISOString(),
    };

    setAllComments((prev) => [...prev, newEntry]);
    setNewComment({ name: "", comment: "" });
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-600">
        <h2 className="text-xl font-semibold">Loading recipe...</h2>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="py-12 text-center text-gray-600">
        <h2 className="text-xl font-semibold">
          {error ? `Error: ${error.message}` : "Recipe not found."}
        </h2>
        <p className="mt-2">
          <a href="/recipes" className="text-primary hover:underline">
            Back to Recipes
          </a>
        </p>
      </div>
    );
  }

  return (
    <MainLayout>
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>
            <p className="text-gray-600 mb-6">{recipe.description}</p>

            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              {recipe.ingredients?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold text-gray-700 mb-2">Steps</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              {recipe.steps?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <div className="mt-8">
              <a href="/recipes" className="text-primary hover:underline">
                ← Back to Recipes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Comments */}
      <section className="mt-12 border-t pt-8 max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>

        {commentsLoading && (
          <p className="text-gray-500">Loading comments...</p>
        )}
        {commentsError && (
          <p className="text-red-500">Error: {commentsError.message}</p>
        )}

        {allComments.length === 0 && !commentsLoading && (
          <p className="text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        )}

        <ul className="space-y-4">
          {allComments.map((comment) => (
            <li key={comment.id} className="border p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-800">
                  {comment.name}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{comment.comment}</p>
            </li>
          ))}
        </ul>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 p-4 border rounded-md shadow-sm bg-gray-50 space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Leave a Comment
          </h3>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={newComment.name}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={newComment.comment}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, comment: e.target.value }))
              }
              required
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition"
          >
            Submit Comment
          </button>
        </form>
      </section>
    </MainLayout>
  );
}
