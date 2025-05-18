import { useRecipes } from "@/hooks/useRecipes";
import { useUsers } from "@/hooks/useUsers";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import DashboardLayout from "@/layouts/DashboardLayout";
import { BookOpen, MessageSquareText, Users } from "lucide-react";
import DashboardCardSkeleton from "@/components/skeleton/DashboardCardSkeleton";

export default function Dashboard() {
  const user = useCurrentUser();
  const {
    recipes,
    loading: recipesLoading,
    error: recipesError,
  } = useRecipes();


  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useUsers();

  const recipeCount = recipes.length;
  const userCount = users.filter((u) => u.role === "user").length;

  const isLoading = recipesLoading || usersLoading;

  return (
    <DashboardLayout>
      {/* Header User Greeting */}
      {user && (
        <div className="mt-4">
          <h2 className="text-xl text-muted-foreground">
            Welcome back,{" "}
            <span className="font-semibold text-gray-800">{user.username}</span> 👋
          </h2>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h1>

      {(recipesError || usersError) && (
        <p className="text-red-600">
          Error: {(recipesError || usersError).message}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
          </>
        ) : (
          <>
            {/* Total Recipes */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Total Recipes
                </h2>
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{recipeCount}</p>
              <p className="text-sm text-muted-foreground mt-1">
                recipes available in the system
              </p>
            </div>

            {/* Total Users */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Total Users
                </h2>
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{userCount}</p>
              <p className="text-sm text-muted-foreground mt-1">
                registered users in the system
              </p>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
