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

  // Set local state once users are loaded
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
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
          <Button asChild>
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
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">No</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
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
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
