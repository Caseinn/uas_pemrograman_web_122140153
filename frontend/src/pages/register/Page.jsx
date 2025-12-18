import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import AuthLayout from "@/layouts/AuthLayout";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

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
  const [status, setStatus] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    setStatus(null);

    if (data.password !== data.password_confirmation) {
      setErrors({ password_confirmation: "Passwords do not match" });
      setProcessing(false);
      return;
    }

    const success = await register(data.username, data.email, data.password);

    if (success) {
      toast.success("Registration successful!");
      navigate("/login");
    } else {
      setStatus("Registration failed. Please try again.");
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <span className="text-xs text-muted-foreground">
                At least 8 characters
              </span>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                autoComplete="new-password"
                value={data.password}
                onChange={handleChange}
                disabled={processing}
                placeholder="Password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-primary focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <div className="relative">
              <Input
                id="password_confirmation"
                type={showConfirm ? "text" : "password"}
                name="password_confirmation"
                required
                autoComplete="new-password"
                value={data.password_confirmation}
                onChange={handleChange}
                disabled={processing}
                placeholder="Confirm password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-primary focus:outline-none"
                aria-label={showConfirm ? "Hide password confirmation" : "Show password confirmation"}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" aria-hidden />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden />
                )}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">
                {errors.password_confirmation}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-2 w-full" disabled={processing}>
            {processing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            ) : null}
            Create account
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-secondary-foreground text-center text-sm">
          Already have an account? <Link to="/login" className="font-semibold text-primary hover:text-primary/90">Log in</Link>
        </div>

        {/* Optional Status Message */}
        {status && (
          <div
            className="text-center text-sm text-red-500 mt-2"
            aria-live="polite"
          >
            {status}
          </div>
        )}
      </form>
    </AuthLayout>
  );
}
