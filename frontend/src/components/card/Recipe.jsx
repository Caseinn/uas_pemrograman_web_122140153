// src/components/RecipeCard.jsx

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function truncate(text, maxLength) {
  return typeof text === "string" && text.length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;
}

export default function RecipeCard({ recipe }) {
  const defaultImage = "https://via.placeholder.com/400x300?text=No+Image"; // fallback image

  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="group block rounded-2xl overflow-hidden border border-primary/10 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transform transition duration-300 bg-white/90 backdrop-blur"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image || defaultImage}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          <span className="h-2 w-2 rounded-full bg-primary mt-1 shrink-0 animate-pulse" aria-hidden />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {truncate(recipe.description, 100)}
        </p>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string, // Allow null
    // category and duration removed from required props
  }).isRequired,
};
