import { Link, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Scroll effect untuk efek transparan saat scroll
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20;
    setIsOpen(isScrolled);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Class link dinamis berdasarkan path aktif
  const getNavLinkClass = (href) => {
    const isActive = location.pathname === href;
    return `px-4 py-2 rounded-md transition-colors duration-300 ${
      isActive
        ? "text-primary font-semibold"
        : "text-muted-foreground hover:text-primary"
    }`;
  };

  const getLogoClass = () =>
    `text-lg flex items-center font-bold transition-colors duration-300 text-primary`;

  return (
    <header className="fixed z-50 left-1/2 top-6 w-[95%] max-w-6xl -translate-x-1/2 rounded-xl bg-[#F5E6DA] shadow-md transition-all duration-300">
      <div className="flex justify-between items-center px-4 py-3 md:px-6">
        {/* Logo / Brand */}
        <Link to="/" className={getLogoClass()}>
          <span className="font-bold text-sm sm:text-base">Nel's Kitchen</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={getNavLinkClass(item.path)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Login Button (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="text-primary border-primary hover:bg-primary/5"
          >
            <Link to="/login">Login</Link>
          </Button>

          {/* <Button
            asChild
            variant="outline"
            size="sm"
            className="text-primary border-primary hover:bg-primary/5"
          >
            <Link to="/dashboard">Dashboard</Link>
          </Button> */}
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-[#F5E6DA] rounded-b-md pb-4 pt-2 mt-1">
          <ul className="flex flex-col gap-2 px-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={getNavLinkClass(item.path)}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start text-left text-primary border-primary hover:bg-primary/5"
              >
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

// Daftar menu navigasi
const navItems = [
  { label: "Home", path: "/" },
  { label: "Recipes", path: "/recipes" },
];
