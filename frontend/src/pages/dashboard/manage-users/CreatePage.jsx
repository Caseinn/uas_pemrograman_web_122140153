import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/hooks/useUsers";
import DashboardLayout from "@/layouts/DashboardLayout";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { createUser, loading } = useCreateUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createUser({ ...form, role: "user" });
    if (success) {
      toast.success("User created successfully!");
      navigate("/dashboard/manage-users");
    } else {
      toast.error("Failed to create user");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New User</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" value={form.username} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? "Submitting..." : "Create User"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
