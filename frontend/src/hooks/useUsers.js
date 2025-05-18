import { useState, useEffect } from "react";

const USER_API_URL = "http://127.0.0.1:6543/api/v1/users";

// 1. Fetch all users
export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(USER_API_URL, {
      credentials: "include", // for cookies/auth if needed
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
}

// 2. Fetch single user by ID
export function useUserById(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${USER_API_URL}/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return { user, loading, error };
}

// 3. Create user
export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createUser = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(USER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create user");
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

  return { createUser, loading, error, success };
}

// 4. Update user
export function useUpdateUser(id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${USER_API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update user");

      return true;
    } catch (err) {
      setError(err.message || "Unexpected error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
}

// 5. Delete user
export function useDeleteUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${USER_API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete user");
      }

      return true;
    } catch (err) {
      setError(err.message || "Unexpected error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
}
