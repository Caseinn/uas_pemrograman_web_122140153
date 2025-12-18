import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Recipes", path: "/recipes" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const getLinkClass = (path) =>
    `px-4 py-2 rounded-md transition-colors duration-300 ${
      isActive(path)
        ? "text-primary font-semibold"
        : "text-primary/80 hover:text-primary"
    }`;

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("auth_tkt");
    navigate("/login");
  };

  const renderUserButtons = () => {
    if (!user) {
      return (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      );
    }

    return (
      <div className="flex items-center gap-2">
        {user.role === "admin" && (
          <Link to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  };

  return (
    <header
      className={`fixed z-50 left-1/2 top-3 w-[96%] max-w-6xl -translate-x-1/2 rounded-xl 
        transition-all duration-300 px-4 md:px-6 ${
          isScrolled
            ? "bg-[#e0d7c8]/95 backdrop-blur-xl border border-primary/20 shadow-2xl"
            : "bg-[#e9dfd1]/90 backdrop-blur-md border border-primary/14 shadow-xl"
        }`}
    >
      <div className="flex justify-between items-center py-3 md:py-3.5">
        <Link
          to="/"
          className="text-lg flex items-center gap-2 font-semibold text-primary"
        >
          <img src="/mascot.png" alt="Mascot" className="w-12 h-12" />
          Nel's Kitchen
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navItems.map(({ label, path }) => {
            const active = isActive(path);
            return (
              <Link key={path} to={path} className="relative">
                <span className={getLinkClass(path)}>{label}</span>
                {active && (
                  <span className="absolute left-3 right-3 -bottom-1 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {renderUserButtons()}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-secondary/95 backdrop-blur text-primary-foreground rounded-2xl px-4 py-4 my-3 shadow-lg border border-primary/10">
          <ul className="flex flex-col gap-3">
            {navItems.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={getLinkClass(path)}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}

            <li className="mt-4">
              {!user ? (
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start bg-primary"
                  >
                    <span>Login</span>
                  </Button>
                </Link>
              ) : (
                <>
                  {user.role === "admin" && (
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="block"
                    >
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start mb-2"
                      >
                        <span>Dashboard</span>
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full justify-start"
                  >
                    Logout
                  </Button>
                </>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
