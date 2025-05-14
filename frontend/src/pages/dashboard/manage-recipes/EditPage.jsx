import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "@/hooks/useRecipes";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, loading, error } = useRecipes();

  const [form, setForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const found = recipes.find((r) => r.id === parseInt(id));
    if (found) {
      setForm({
        ...found,
        ingredients: Array.isArray(found.ingredients)
          ? found.ingredients.join(", ")
          : "",
        steps: Array.isArray(found.steps) ? found.steps.join("\n") : "",
      });
    }
  }, [recipes, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulasi proses update
    setTimeout(() => {
      console.log("Updated Recipe:", {
        ...form,
        ingredients: form.ingredients.split(",").map((i) => i.trim()),
        steps: form.steps.split("\n").map((s) => s.trim()),
      });
      setSubmitting(false);
      navigate("/dashboard/manage-recipes");
    }, 1000);
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

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="steps">Steps (one per line)</Label>
            <Textarea
              id="steps"
              name="steps"
              value={form.steps}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full mt-4">
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
