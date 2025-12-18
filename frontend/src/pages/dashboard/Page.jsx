import { useRecipes } from "@/hooks/useRecipes";
import { useUsers } from "@/hooks/useUsers";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import DashboardLayout from "@/layouts/DashboardLayout";
import { BookOpen, Users } from "lucide-react";
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
            <span className="font-semibold text-gray-800">{user.username}</span>
          </h2>
        </div>
      )}

      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          A quick glance at your kitchen. Calm, clear, and ready.
        </p>
      </div>

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
            <div className="bg-white/95 rounded-2xl shadow-md p-6 border border-border/70 hover:shadow-lg transition">
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
            <div className="bg-white/95 rounded-2xl shadow-md p-6 border border-border/70 hover:shadow-lg transition">
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

            {recipeCount === 0 && (
              <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-muted-foreground">
                No recipes yet. Add your first one to populate the dashboard.
              </div>
            )}

            {userCount === 0 && (
              <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-muted-foreground">
                No users found. Invite or create new users to get started.
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
