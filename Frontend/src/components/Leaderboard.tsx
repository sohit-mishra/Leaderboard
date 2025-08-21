import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type User = {
  _id: string;
  name: string;
  totalpoints: number;
  avatarUrl?: string;
};

type LeaderboardProps = {
  claim: boolean;
};

export default function Leaderboard({ claim }: LeaderboardProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/leaderboard`
        );
        setUsers(res.data.slice(0, 8)); 
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [claim]);

  if (loading) {
    return <p className="text-center py-10">Loading leaderboard...</p>;
  }

  const topThree = users.slice(0, 3);
  const others = users.slice(1);

  return (
    <Card className="w-full mx-auto border-0 shadow-none rounded-none pt-0 pb-0">
      <CardContent className="p-6">
        <Tabs defaultValue="leaderboard" className="w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Leaderboard</h1>
          <TabsContent value="leaderboard">
           
            <div className="flex justify-around items-end mb-6">
              {topThree.map((user, index) => (
                <motion.div
                  key={user._id}
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <Avatar
                    className={`w-${index === 0 ? 14 : 12} h-${
                      index === 0 ? 14 : 12
                    }`}
                  >
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback>👤</AvatarFallback>
                  </Avatar>
                  <Link
                    to={`/history/${user._id}`}
                    className="mt-1 text-grey-600 hover:underline flex items-center gap-1"
                  >
                    {user.name}
                  </Link>
                  <p className="text-green-600 font-bold">{user.totalpoints}</p>
                  <div
                    className={`w-16 mt-1 rounded-t-lg flex items-center justify-center ${
                      index === 0
                        ? "h-16 bg-yellow-300"
                        : index === 1
                        ? "h-12 bg-gray-200"
                        : "h-10 bg-orange-300"
                    }`}
                  >
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </div>
                </motion.div>
              ))}
            </div>

          
            <motion.ul
              className="divide-y divide-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {others.map((user, idx) => (
                <motion.li
                  key={user._id}
                  className="flex justify-between items-center py-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-bold text-gray-600">{idx + 4}</span>
                    <span className="flex items-center gap-1">
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>👤</AvatarFallback>
                      </Avatar>
                      <Link
                        to={`/history/${user._id}`}
                        className="text-grey-600 hover:underline flex items-center gap-1"
                      >
                        {user.name}
                      </Link>
                    </span>
                  </span>
                  <span className="text-green-600 font-semibold">
                    {user.totalpoints}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
