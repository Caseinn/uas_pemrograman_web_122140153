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
import { useState, useEffect, useMemo } from "react";
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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 10;

export default function ListRecipes() {
  const { recipes, loading, error } = useRecipes();
  const { deleteRecipe, loading: deleting } = useDeleteRecipe();
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const [localRecipes, setLocalRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!loading && !error) {
      setLocalRecipes(recipes);
    }
  }, [recipes, loading, error]);

  const filteredRecipes = useMemo(() => {
    return localRecipes.filter((r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [localRecipes, searchTerm]);

  const lastUpdated = useMemo(() => {
    if (!filteredRecipes.length) return null;
    const latest = Math.max(
      ...filteredRecipes.map((r) => new Date(r.updated_at).getTime())
    );
    return new Date(latest).toLocaleDateString();
  }, [filteredRecipes]);

  const handleDelete = async (id) => {
    const success = await deleteRecipe(id);
    if (success) {
      toast.success("Recipe deleted successfully.");
      setDeletingId(null);
      setLocalRecipes((prev) => prev.filter((r) => r.id !== id));
    } else {
      toast.error("Failed to delete recipe.");
    }
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE)
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Library
            </p>
            <h1 className="text-2xl font-bold text-gray-800">Manage Recipes</h1>
            <p className="text-muted-foreground text-sm">
              Curate, refine, and publish recipes with quick insights.
            </p>
          </div>
          <Button asChild className="shadow-lg shadow-primary/20 rounded-full">
            <Link
              to="/dashboard/manage-recipes/create"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Recipe
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-white/90 p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Total Recipes</p>
            <p className="text-2xl font-bold text-gray-900">
              {localRecipes.length}
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-white/90 p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Showing</p>
            <p className="text-2xl font-bold text-gray-900">
              {paginatedRecipes.length} / {filteredRecipes.length || 0}
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-white/90 p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="text-lg font-semibold text-gray-900">
              {lastUpdated || "—"}
            </p>
          </div>
        </div>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">Error: {error.message}</p>}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-border/70 shadow-md bg-white/95 backdrop-blur">
            <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between border-b border-border/60">
              <Input
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="max-w-sm rounded-xl"
              />
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-secondary/60">
                  <TableRow>
                    <TableHead className="w-12 text-center font-semibold">
                      No
                    </TableHead>
                    <TableHead className="font-semibold">Title</TableHead>
                    <TableHead className="font-semibold">Created At</TableHead>
                    <TableHead className="font-semibold">Updated At</TableHead>
                    <TableHead className="text-right font-semibold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRecipes.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-6 text-muted-foreground"
                      >
                        No recipes yet. Add one to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedRecipes.map((recipe, index) => (
                      <TableRow
                        key={recipe.id}
                        className="transition hover:bg-muted/40"
                      >
                        <TableCell className="text-center font-medium">
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-secondary-foreground">
                          {recipe.title}
                        </TableCell>
                        <TableCell>
                          {new Date(recipe.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(recipe.updated_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                          >
                            <Link
                              to={`/dashboard/manage-recipes/edit/${recipe.id}`}
                            >
                              <Pencil className="w-4 h-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="rounded-full"
                              >
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {filteredRecipes.length > ITEMS_PER_PAGE && (
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
                className="rounded-full"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="rounded-full"
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
