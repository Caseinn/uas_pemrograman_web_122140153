import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // ✅ Tambahkan ini
import DashboardLayout from "@/layouts/DashboardLayout";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:6543/api/v1";
const API_URL = `${API_BASE}/recipes`;

export default function CreateRecipe() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    ingredients: "",
    steps: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create recipe");
      }

      // ✅ Tampilkan toast success
      toast.success("Recipe created successfully!");

      // Redirect
      navigate("/dashboard/manage-recipes");
    } catch (err) {
      const message = err.message || "Unexpected error";
      setError(message);
      // ✅ Tampilkan toast error
      toast.error(`Error: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create New Recipe
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Example: Nasi Goreng Special"
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
              placeholder="Short description of the recipe..."
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

          <Button type="submit" disabled={submitting} className="w-full mt-4">
            {submitting ? "Submitting..." : "Submit Recipe"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
