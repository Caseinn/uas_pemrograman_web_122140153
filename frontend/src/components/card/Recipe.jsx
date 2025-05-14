// src/components/landing-page/latest-recipes/RecipeCard.jsx

import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {recipe.description}
          </p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-primary font-medium">
              {recipe.category || "Masakan Rumahan"}
            </span>
            <span className="text-xs text-muted-foreground">
              Durasi: {recipe.duration || "30 min"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
