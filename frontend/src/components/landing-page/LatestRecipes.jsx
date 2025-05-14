import RecipeCard from "../card/Recipe";

const mockRecipes = [
  {
    id: 1,
    title: "Nasi Goreng Spesial",
    description:
      "Nasi goreng lezat dengan telur, ayam suwir, dan bumbu istimewa.",
    image: "https://picsum.photos/id/1074/400/300 ", // Nasi goreng (mirip nasi)
    category: "Indonesian",
    duration: "20 min",
  },
  {
    id: 2,
    title: "Soto Ayam Lamongan",
    description:
      "Soto ayam khas Lamongan dengan kuah kuning gurih dan bumbu rempah lengkap.",
    image: "https://picsum.photos/id/260/400/300 ", // Kuah kaldu
    category: "Indonesian",
    duration: "45 min",
  },
  {
    id: 3,
    title: "Bakso Sapi Kenyal",
    description:
      "Resep bakso sapi kenyal dan nikmat untuk dinikmati bersama kuah panas.",
    image: "https://picsum.photos/id/83/400/300 ", // Mirip makanan kuah & bola daging
    category: "Indonesian",
    duration: "60 min",
  },
  {
    id: 4,
    title: "Sup Ayam Jagung Manis",
    description:
      "Sup hangat dengan campuran jagung manis dan daging ayam lembut.",
    image: "https://picsum.photos/id/237/400/300 ", // Sayuran/soup look
    category: "Sup",
    duration: "35 min",
  },
  {
    id: 5,
    title: "Pecel Lele Lengkap",
    description:
      "Lele goreng renyah disajikan dengan sambal pecel dan lalapan segar.",
    image: "https://picsum.photos/id/732/400/300 ", // Ikan goreng
    category: "Indonesian",
    duration: "40 min",
  },
  {
    id: 6,
    title: "Kue Lumpur Kentang",
    description:
      "Kue basah lembut berbahan dasar kentang dan santan, cocok sebagai camilan sore.",
    image: "https://picsum.photos/id/972/400/300 ", // Dessert/cake-like
    category: "Dessert",
    duration: "30 min",
  },
];

export default function LatestRecipes() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
          Latest Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
}
