import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:6543/api/v1";
const API_URL = `${API_BASE}/comments`;

export function useComments(recipeId = null) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil komentar
  const fetchComments = async () => {
    setLoading(true);
    try {
      const url = recipeId
        ? `${API_URL}?recipe_id=${parseInt(recipeId)}`
        : API_URL;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Gunakan useEffect untuk memanggil fetchComments
  useEffect(() => {
    if (recipeId) {
      fetchComments();
    }
    console.log("useEffect fetchComments", recipeId);
  }, [recipeId]); // Bergantung langsung pada recipeId

  const createComment = async (newComment) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      if (!response.ok) throw new Error("Failed to create comment");
      const created = await response.json();
      fetchComments(); // Pastikan data baru ditambahkan ke dalam list komentar
      return created;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateComment = async (id, updatedFields) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) throw new Error("Failed to update comment");
      const updated = await response.json();
      setComments((prev) => prev.map((c) => (c.id === id ? updated : c)));
      return updated;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteComment = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete comment");
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    comments,
    loading,
    error,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
  };
}
