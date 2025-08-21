import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  totalpoints: number;
};

type UserListProps = {
  userList: boolean;
  setClaim: React.Dispatch<React.SetStateAction<boolean>>;
  setUserList: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserList({
  userList,
  setClaim,
  setUserList,
}: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const totalPages = users.length > 0 ? Math.ceil(users.length / pageSize) : 1;

  const fetchUsers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get<User[]>(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/list`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(response.data);
      setSelectedUsers(new Set());
      setError(null);
      setUserList(false);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Error fetching users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userList) fetchUsers();
  }, [token, userList]);

  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prev) => {
      const updated = new Set(prev);
      updated.has(userId) ? updated.delete(userId) : updated.add(userId);
      return updated;
    });
  };

  const handleSelectAll = () => {
    const allSelected = paginatedUsers.every((u) => selectedUsers.has(u._id));
    const updated = new Set(selectedUsers);
    paginatedUsers.forEach((u) => {
      allSelected ? updated.delete(u._id) : updated.add(u._id);
    });
    setSelectedUsers(updated);
  };

  const handleClaim = async () => {
    if (selectedUsers.size === 0 || !token) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/claim`,
        { userIds: Array.from(selectedUsers) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setClaim(true);
      setSelectedUsers(new Set());
      fetchUsers();
    } catch (err: any) {
      console.error(
        "Error claiming points:",
        err.response?.data || err.message
      );
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={handleClaim}
          disabled={selectedUsers.size === 0}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          Claim
        </button>
        <div>
          Selected: {selectedUsers.size} / {users.length}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input
                type="checkbox"
                checked={paginatedUsers.every((u) => selectedUsers.has(u._id))}
                onChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedUsers.has(user._id)}
                  onChange={() => handleCheckboxChange(user._id)}
                />
              </TableCell>
              <TableCell>
                <img
                  src={user.avatarUrl || "https://via.placeholder.com/40"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              </TableCell>
              <TableCell>
                <Link
                  to={`/history/${user._id}`}
                  className="flex items-center gap-1 text-grey-600 hover:underline"
                >
                  {user.name} <ExternalLink className="w-4 h-4" />
                </Link>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.totalpoints} pts</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
