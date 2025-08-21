import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";

type Claim = {
  _id: string;
  points: number;
  createdAt: string;
};

export default function ClaimHistory() {
  const { id } = useParams<{ id: string }>();
  const [history, setHistory] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/history/${id}`
        );
        setHistory(res.data);
      } catch (error) {
        console.error("Error fetching claim history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHistory();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading claim history...</p>;
  }

  if (history.length === 0) {
    return <p className="text-center py-10 text-gray-500">No claim history found.</p>;
  }

  return (
    <div className="p-6 bg-white max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Claim History</h1>

      <div className="overflow-x-auto">
        <Table className="min-w-full border border-gray-200 rounded-lg">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="py-3 px-4 text-left">#</TableHead>
              <TableHead className="py-3 px-4 text-left">Points</TableHead>
              <TableHead className="py-3 px-4 text-left">Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {history.map((item, index) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 120 }}
                className={`border-b hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <TableCell className="py-3 px-4 font-medium">{index + 1}</TableCell>
                <TableCell className="py-3 px-4 text-green-600 font-semibold">
                  {item.points}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-600">
                  {new Date(item.createdAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
