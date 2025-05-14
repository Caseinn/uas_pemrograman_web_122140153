import MainLayout from "./components/Layout";
import HeroSection from "./components/landing-page/Hero";
import LatestRecipes from "./components/landing-page/LatestRecipes";

function App() {
  return (
    <>
      <MainLayout>
        <HeroSection
          title="Welcome to Nel's Recipes"
          subtitle="Discover your new favorite recipes"
          ctaText="Explore Recipes"
          ctaLink="/recipes"
        />
        <LatestRecipes />
      </MainLayout>
    </>
  );
}

export default App;
