import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/login/Page.jsx";
import Register from "@/pages/register/Page.jsx";
import RecipeList from "@/pages/recipes/ListPage";
import RecipeDetail from "@/pages/recipes/DetailedPage";
import Dashboard from "@/pages/dashboard/Page";
import ListRecipes from "@/pages/dashboard/manage-recipes/ListPage";
import CreateRecipe from "@/pages/dashboard/manage-recipes/CreatePage";
import EditRecipe from "@/pages/dashboard/manage-recipes/EditPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="*" element={<h1>Halaman tidak ditemukan</h1>} />

        {/* ADMIN AREAS */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/manage-recipes" element={<ListRecipes />} />
        <Route
          path="/dashboard/manage-recipes/create"
          element={<CreateRecipe />}
        />
        <Route
          path="/dashboard/manage-recipes/edit/:id"
          element={<EditRecipe />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
