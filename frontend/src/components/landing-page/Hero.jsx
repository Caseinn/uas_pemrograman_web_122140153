import { Link } from "react-router-dom";
import { forwardRef, useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Default images untuk hero section
const defaultImages = [
  "https://upload.wikimedia.org/wikipedia/commons/5/5e/La_cuisine_%28mus%C3%A9e_dart_nouveau%2C_Riga%29_%287563655820%29.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1X3hwZz47RDCf1G5zehwrGhPSXoIJMDAz3w&s",
  "https://www.realsimple.com/thmb/vX5iLDFcU2ebXER4yJv7XaTI6EQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-2161780422-2c0c043bcdf04315809453f6ffea281e.jpg",
];

const HeroSection = forwardRef(
  ({ images = defaultImages, title, subtitle, ctaText, ctaLink = "" }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);

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
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    };

    useEffect(() => {
      resetInterval();
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, []);

    return (
      <section
        ref={ref}
        className="relative w-full h-screen min-h-screen overflow-hidden bg-gradient-to-t from-primary to-white text-white"
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
        <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 drop-shadow-lg whitespace-pre-line">
            {title || "Nels Recipes\nDiscover the joy of cooking"}
          </h2>
          <p className="text-lg lg:text-xl text-white mb-8 drop-shadow">
            {subtitle || "Find and explore your next favorite recipe."}
          </p>

          {ctaLink && (
            <Link
              to={ctaLink}
              className="bg-white text-primary font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition"
            >
              {ctaText || "Browse Recipes"}
            </Link>
          )}
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

        {/* Background Overlay Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-b from-transparent to-[#f4f8ff] pointer-events-none z-10" />
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export default HeroSection;
