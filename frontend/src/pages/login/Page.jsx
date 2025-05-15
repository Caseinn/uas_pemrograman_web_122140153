import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import AuthLayout from "@/layouts/AuthLayout";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const success = await login(data.username, data.password);
    if (success) {
      alert("Login successful!");
      navigate("/dashboard");
    }

    setProcessing(false);
  };

  return (
    <AuthLayout title="Log in to your account" description="Enter your email and password to log in">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Username / Email */}
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              required
              autoFocus
              autoComplete="email"
              value={data.username}
              onChange={handleChange}
              disabled={processing}
              placeholder="Your username"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              value={data.password}
              onChange={handleChange}
              disabled={processing}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-2 w-full" disabled={processing}>
            {processing ? (
              <span className="animate-spin mr-2">🔄</span>
            ) : null}
            Log in
          </Button>
        </div>

        {/* Register Link */}
        <div className="text-muted-foreground text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register">Create an account</Link>
        </div>

        {/* Optional Status Message */}
        {status && (
          <div className="text-center text-sm text-red-500 mt-2">{status}</div>
        )}
      </form>
    </AuthLayout>
  );
}