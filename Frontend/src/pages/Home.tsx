import { useState, type FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Leaderboard from "@/components/Leaderboard";
import UserList from "@/components/UserList";
import AddUser from "@/components/AddUser";

const Home: FC = () => {
  const [userList, setUserList] = useState<boolean>(true);
  const [claim, setClaim] = useState<boolean>(false);

  return (
    <main className="p-6 w-full mx-auto flex flex-col md:flex-row gap-6">
      <Card className="shadow rounded-2xl flex-1 min-w-[500px]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <UserList
            userList={userList}
            setClaim={setClaim}
            setUserList={setUserList}
          />
        </CardContent>
      </Card>

      <div className="space-y-6 w-full md:w-[400px] shrink-0">
        <Card className="shadow rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Add New User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddUser setUserList={setUserList} />
          </CardContent>
        </Card>

        <Card className="shadow rounded-2xl pt-0 mt-0">
          <Leaderboard claim={claim} />
        </Card>
      </div>
    </main>
  );
};

export default Home;
