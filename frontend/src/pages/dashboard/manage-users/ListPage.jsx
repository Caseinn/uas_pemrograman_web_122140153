import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { useUsers, useDeleteUser } from "@/hooks/useUsers";
import { toast } from "sonner";
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

export default function ListUsers() {
  const { users, loading, error } = useUsers();
  const { deleteUser, loading: deleting } = useDeleteUser();

  const [localUsers, setLocalUsers] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!loading && users) {
      setLocalUsers(users.filter((u) => u.role === "user"));
    }
  }, [users, loading]);

  const handleDelete = async (id) => {
    const success = await deleteUser(id);
    if (success) {
      toast.success("User deleted successfully");
      setDeletingId(null);
      setLocalUsers((prev) => prev.filter((u) => u.id !== id));
    } else {
      toast.error("Failed to delete user");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              People
            </p>
            <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
            <p className="text-muted-foreground text-sm">
              Keep your community organized and up to date.
            </p>
          </div>
          <Button asChild className="shadow-lg shadow-primary/20 rounded-full">
            <Link
              to="/dashboard/manage-users/create"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add User
            </Link>
          </Button>
        </div>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">Error: {error.message}</p>}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-border/70 shadow-md bg-white/95 backdrop-blur">
            <div className="border-b border-border/60 px-4 py-3">
              <p className="text-sm text-muted-foreground">
                {localUsers.length} users
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-secondary/60">
                  <TableRow>
                    <TableHead className="w-12 text-center font-semibold">
                      No
                    </TableHead>
                    <TableHead className="font-semibold">Username</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="text-right font-semibold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-6 text-muted-foreground"
                      >
                        No users yet. Create or invite a user to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    localUsers.map((user, index) => (
                      <TableRow
                        key={user.id}
                        className="transition hover:bg-muted/40"
                      >
                        <TableCell className="text-center font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-secondary-foreground">
                          {user.username}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="rounded-full"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                {deleting && deletingId === user.id
                                  ? "Deleting..."
                                  : "Delete"}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete user{" "}
                                  <strong>{user.username}</strong>.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    setDeletingId(user.id);
                                    handleDelete(user.id);
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
      </div>
    </DashboardLayout>
  );
}
