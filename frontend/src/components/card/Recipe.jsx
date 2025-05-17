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
      className="group block rounded-xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-sm hover:-translate-y-1 transform transition duration-300 bg-amber-50"
    >
      <div className="aspect-w-4 aspect-h-3 overflow-hidden max-h-[300px]">
        <img
          src={recipe.image || defaultImage}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-1">
          {truncate(recipe.description, 80)}
        </p>
        {/* Optional footer removed if category/duration unavailable */}
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
