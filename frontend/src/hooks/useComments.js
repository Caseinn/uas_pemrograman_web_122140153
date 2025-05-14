import { useState, useEffect } from "react";

export function useComments(recipeId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/comments.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load comments");
        return res.json();
      })
      .then((data) => {
        const filtered = data.filter((c) => c.recipeId === Number(recipeId));
        setComments(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [recipeId]);

  return { comments, loading, error };
}
