import { useParams, useNavigate } from "react-router-dom";
import { useRecipeById, useUpdateRecipe } from "@/hooks/useRecipes";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/layouts/DashboardLayout";
import { toast } from "sonner";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipe, loading, error } = useRecipeById(id);
  const {
    updateRecipe,
    loading: updating,
    error: updateError,
  } = useUpdateRecipe(id);

  const [form, setForm] = useState(null);

  useEffect(() => {
    if (recipe) {
      setForm({
        title: recipe.title || "",
        description: recipe.description || "",
        image: recipe.image || "",
        ingredients: recipe.ingredients || "",
        steps: recipe.steps || "",
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await updateRecipe(form);
      if (success) {
        toast.success("Recipe updated successfully");
        navigate("/dashboard/manage-recipes");
      } else {
        toast.error("Failed to update recipe");
      }
    } catch (err) {
      toast.error("Unexpected error occurred.");
      console.error(err);
    }
  };

  if (loading || !form) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 mt-10 text-center">
        Error: {error.message}
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Recipe</h1>

        {updateError && (
          <p className="text-red-600 mb-4">Error: {updateError}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ingredients">
              Ingredients (use line breaks for each)
            </Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              required
              placeholder="e.g.\n2 cups of rice\n1 egg\n1 tbsp soy sauce"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="steps">Steps (use line breaks for each)</Label>
            <Textarea
              id="steps"
              name="steps"
              value={form.steps}
              onChange={handleChange}
              required
              placeholder="e.g.\n1. Heat the pan\n2. Add garlic\n3. Stir fry rice"
            />
          </div>

          <Button type="submit" disabled={updating} className="w-full mt-4">
            {updating ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
