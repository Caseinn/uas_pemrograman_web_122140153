import AppLogoIcon from "@/components/Logo";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function AuthSimpleLayout({ children, title, description }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-secondary">
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-secondary/70 to-secondary pointer-events-none" />
      <div className="relative w-full max-w-sm px-6 md:px-0">
        <div className="flex flex-col gap-8 rounded-3xl border border-border/70 bg-white/85 backdrop-blur shadow-xl px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/"
              className="flex flex-col items-center gap-2 font-medium text-primary hover:text-primary/90 transition"
            >
              <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <AppLogoIcon />
              </div>
              <span className="sr-only">{title}</span>
            </Link>

            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold text-secondary-foreground">
                {title}
              </h1>
              <p className="text-secondary-foreground text-center text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

// Set prop types and default props
AuthSimpleLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};

AuthSimpleLayout.defaultProps = {
  title: "",
  description: "",
};

export default AuthSimpleLayout;
