import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <section className="flex flex-col md:flex-row items-center justify-between max-w-3xl w-full bg-white/80 dark:bg-gray-900/80 p-8">
        {/* Mascot Image */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="/mascot.png"
            alt="Nel's Kitchen Mascot"
            className="w-full max-w-xs mx-auto"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-7xl font-extrabold text-primary">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300"
            >
              Back to Home
            </Link>
            <a
              href="mailto:ditorifki.irawan@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
