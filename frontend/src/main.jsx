import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/login/Page.jsx";
import Register from "@/pages/register/Page.jsx";
import RecipeList from "@/pages/recipes/ListPage";
import RecipeDetail from "@/pages/recipes/DetailPage";
import Dashboard from "@/pages/dashboard/Page";
import ListRecipes from "@/pages/dashboard/manage-recipes/ListPage";
import CreateRecipe from "@/pages/dashboard/manage-recipes/CreatePage";
import ListUsers from "@/pages/dashboard/manage-users/ListPage";
import CreateUser from "@/pages/dashboard/manage-users/CreatePage";
import EditRecipe from "@/pages/dashboard/manage-recipes/EditPage";
import NotFoundPage from "@/pages/not-found/Page";
import UnAuthorizedPage from "@/pages/unauthorized/Page";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton expand />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/unauthorized" element={<UnAuthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />

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
        <Route path="/dashboard/manage-users" element={<ListUsers />} />
        <Route 
        path="/dashboard/manage-users/create" 
        element={<CreateUser />} 
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
