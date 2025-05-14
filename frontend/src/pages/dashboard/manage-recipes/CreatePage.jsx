import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function CreateRecipe() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    image: "",
    ingredients: "",
    steps: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulasi penyimpanan (bisa diganti fetch ke API)
    setTimeout(() => {
      console.log("Recipe submitted:", form);
      setSubmitting(false);
      navigate("/dashboard/manage-recipes");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create New Recipe
        </h1>

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

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                placeholder="e.g. Indonesian"
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
                placeholder="e.g. 30 min"
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
              placeholder="https://example.com/image.jpg"
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
              placeholder="e.g. rice, egg, soy sauce, garlic"
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
              placeholder="e.g. 1. Heat the pan...\n2. Add egg..."
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
