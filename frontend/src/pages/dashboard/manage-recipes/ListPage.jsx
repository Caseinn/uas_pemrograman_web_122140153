import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRecipes, useDeleteRecipe } from "@/hooks/useRecipes";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner"; // ✅ Tambahkan ini

const ITEMS_PER_PAGE = 5;

export default function ListRecipes() {
  const { recipes, loading, error } = useRecipes();
  const { deleteRecipe, loading: deleting } = useDeleteRecipe();
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // ✅ Pemicu render ulang sederhana

  const handleDelete = async (id) => {
    const success = await deleteRecipe(id);
    if (success) {
      toast.success("Recipe deleted successfully."); // ✅ toast sukses
      setDeletingId(null);
      setRefreshTrigger((prev) => prev + 1); // ✅ picu ulang render
    } else {
      toast.error("Failed to delete recipe."); // ✅ toast error
    }
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRecipes = recipes.slice(startIndex, endIndex);
  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Recipes</h1>
          <Button asChild>
            <Link
              to="/dashboard/manage-recipes/create"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Recipe
            </Link>
          </Button>
        </div>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">Error: {error.message}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">No</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRecipes.map((recipe, index) => (
                  <TableRow key={`${recipe.id}-${refreshTrigger}`}>
                    <TableCell className="text-center font-medium">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell>{recipe.title}</TableCell>
                    <TableCell>
                      {new Date(recipe.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(recipe.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button asChild variant="outline" size="sm">
                        <Link
                          to={`/dashboard/manage-recipes/edit/${recipe.id}`}
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4 mr-1" />
                            {deleting && deletingId === recipe.id
                              ? "Deleting..."
                              : "Delete"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the recipe{" "}
                              <strong>{recipe.title}</strong>. This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                setDeletingId(recipe.id);
                                handleDelete(recipe.id);
                              }}
                            >
                              Confirm Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
