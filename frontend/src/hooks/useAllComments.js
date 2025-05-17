// hooks/useAllComments.js
import { useState, useEffect } from "react";

export function useAllComments() {
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
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { comments, loading, error };
}
