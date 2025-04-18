import { useEffect, useState } from "react";
import { getTopUsers } from "../api";

const TopUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getTopUsers().then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Top Users</h2>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded">
            {user.name} - {user.comments} comments
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
