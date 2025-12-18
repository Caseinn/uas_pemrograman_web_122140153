import { Link } from "react-router-dom";

export default function UnAuthorizedPage() {
  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <section className="flex flex-col md:flex-row items-center justify-between max-w-3xl w-full bg-white/80 dark:bg-gray-900/80 p-8 rounded-xl">
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
          <h1 className="text-6xl font-extrabold text-primary">403</h1>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to view this page. Please contact the
            administrator if you believe this is a mistake.
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
