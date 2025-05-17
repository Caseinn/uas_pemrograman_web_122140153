import { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:6543/api/v1/recipes";

// Untuk halaman list semua resep
export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:6543/api/v1/recipes")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        return res.json();
      })
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { recipes, loading, error };
}

export function useRecipeById(id) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:6543/api/v1/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipe");
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return { recipe, loading, error };
}

export function useCreateRecipe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createRecipe = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create recipe");
      }

      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.message || "Unexpected error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createRecipe, loading, error, success };
}

export function useUpdateRecipe(id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateRecipe = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update recipe");

      return true;
    } catch (err) {
      setError(err.message || "Unexpected error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateRecipe, loading, error };
}

export function useDeleteRecipe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRecipe = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://127.0.0.1:6543/api/v1/recipes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete recipe");
      }

      return true;
    } catch (err) {
      setError(err.message || "Unexpected error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRecipe, loading, error };
}
