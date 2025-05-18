import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Menu,
  X,
  LogOut,
  ChefHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import clsx from "clsx";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  {
    label: "Manage Recipes",
    path: "/dashboard/manage-recipes",
    icon: BookOpen,
  },
  {
    label: "Manage Users",
    path: "/dashboard/manage-users",
    icon: BookOpen,
  },
];

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useCurrentUser();

  useEffect(() => {
    // Redirect jika belum login
    if (!user) {
      navigate("/login");
      return;
    }

    // Redirect jika login tapi bukan admin
    if (user.role !== "admin") {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      alert("Logout successful!");
      navigate("/login");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted">
        Checking session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed md:top-4 md:left-4 top-0 left-0 z-50 w-64 h-full md:h-[calc(100vh-2rem)] bg-white shadow-xl rounded-none md:rounded-2xl p-6 transition-transform duration-300 ease-in-out overflow-y-auto",
          "transform md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col justify-between h-full space-y-6">
          {/* Header Branding */}
          <div className="flex flex-col gap-1 mb-6">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <img
                  src={"/mascot.png"}
                  alt="Nel's Kitchen Mascot"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-xl font-semibold text-primary">
                  Nel's Kitchen
                </span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground pl-1">
              Welcome, {user.username}
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map(({ label, path, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    active
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-primary/10"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <Button
            variant="destructive"
            className="w-full flex items-center gap-2 mt-auto"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img
              src={"/mascot.png"}
              alt="Nel's Kitchen Mascot"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold text-primary text-lg">
              Nel's Kitchen
            </span>
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </header>

      {/* Main Content */}
      <main
        className={clsx(
          "p-6 transition-all",
          "md:ml-[272px] pt-4",
          "min-h-screen"
        )}
      >
        {children}
      </main>
    </div>
  );
}
