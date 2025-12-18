import { Link } from "react-router-dom";
import { forwardRef, useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

// Default images untuk hero section
const defaultImages = [
  "/images/kitchen1.jpg",
  "/images/kitchen2.jpg",
  "/images/kitchen3.jpeg",
];

const HeroSection = forwardRef(
  ({ images = defaultImages, title, subtitle, ctaText, ctaLink = "" }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);
    const prefersReducedMotion = useRef(false);

    // Fungsi navigasi slide
    const goToSlide = (index) => {
      setCurrentIndex(index);
      resetInterval();
    };

    const goToPrev = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      resetInterval();
    };

    const goToNext = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      resetInterval();
    };

    const resetInterval = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (prefersReducedMotion.current || isPaused) return;
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    };

    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotion.current = mediaQuery.matches;

      const handleMotionChange = (event) => {
        prefersReducedMotion.current = event.matches;
        resetInterval();
      };

      mediaQuery.addEventListener("change", handleMotionChange);
      resetInterval();
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        mediaQuery.removeEventListener("change", handleMotionChange);
      };
      // Re-run when pause state or slide count changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images.length, isPaused]);

    return (
      <section
        ref={ref}
        className="relative w-full min-h-[70vh] lg:min-h-[80vh] overflow-hidden bg-slate-950 text-white"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {/* Slides */}
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            className={`
              absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out
              ${
                index === currentIndex
                  ? "opacity-100 scale-100 blur-0"
                  : "opacity-0 scale-105 blur-md pointer-events-none"
              }
            `}
          />
        ))}

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-900/30" />
        <div className="absolute inset-0 z-20 flex flex-col items-center md:items-start justify-center text-center md:text-left px-25">
          <div className="max-w-4xl space-y-4">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg whitespace-pre-line">
              {title || "Nels Recipes\nDiscover the joy of cooking"}
            </h2>
            <p className="text-lg lg:text-xl text-white/90 drop-shadow">
              {subtitle || "Find and explore your next favorite recipe."}
            </p>

            {ctaLink && (
              <Link
                to={ctaLink}
                className="inline-flex w-fit bg-white text-primary font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded-full shadow hover:bg-gray-100 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white text-sm sm:text-base"
              >
                {ctaText || "Browse Recipes"}
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer z-20"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-primary"
                  : "bg-primary/50 hover:bg-primary/70"
              } cursor-pointer`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Pause / Play */}
        <div className="absolute bottom-6 right-6 z-20">
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-primary shadow hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-pressed={isPaused}
          >
            {isPaused ? (
              <>
                <Play className="h-4 w-4" />
                Resume
              </>
            ) : (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            )}
          </button>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export default HeroSection;
