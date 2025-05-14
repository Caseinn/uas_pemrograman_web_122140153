import MainLayout from "./components/Layout";
import HeroSection from "./components/landing-page/Hero";
import LatestRecipes from "./components/landing-page/LatestRecipes";

function App() {
  return (
    <>
      <MainLayout>
        <HeroSection
          title="Welcome to Nels Recipes"
          subtitle="Explore thousands of delicious recipes today!"
          ctaText="Get Started"
          ctaLink="/recipes"
        />
        <LatestRecipes />
      </MainLayout>
    </>
  );
}

export default App;
