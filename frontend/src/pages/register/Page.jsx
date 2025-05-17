import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import AuthLayout from "@/layouts/AuthLayout";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    if (data.password !== data.password_confirmation) {
      setErrors({ password_confirmation: "Passwords do not match" });
      setProcessing(false);
      return;
    }

    const success = await register(data.username, data.email, data.password);

    if (success) {
      alert("Registration successful!");
      navigate("/login");
    }

    setProcessing(false);
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Username */}
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              required
              autoFocus
              autoComplete="username"
              value={data.username}
              onChange={handleChange}
              disabled={processing}
              placeholder="Your username"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={data.email}
              onChange={handleChange}
              disabled={processing}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
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
              autoComplete="new-password"
              value={data.password}
              onChange={handleChange}
              disabled={processing}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              required
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={handleChange}
              disabled={processing}
              placeholder="Confirm password"
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">
                {errors.password_confirmation}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-2 w-full" disabled={processing}>
            {processing ? <span className="animate-spin mr-2">🔄</span> : null}
            Create account
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-secondary-foreground text-center text-sm">
          Already have an account? <Link to="/login">Log in</Link>
        </div>

        {/* Optional Status Message */}
        {status && (
          <div className="text-center text-sm text-red-500 mt-2">{status}</div>
        )}
      </form>
    </AuthLayout>
  );
}
