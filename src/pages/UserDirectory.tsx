import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

interface User {
  id: number;
  name: string;
  posts: number;
}

function UserDirectory(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: User[] = await response.json();
        const usersWithPosts: User[] = data.map(user => ({ ...user, posts: 0 }));
        setUsers(usersWithPosts);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>User Directory</h1>
      <div className="userDirectory">
        <div className="users">
          {users.map((user) => (
            <div key={user.id}>
              <div className="person">
                <Link to={`/user/${user.id}`}>
                  <h2>Name: {user.name}</h2>
                </Link>
                <p>Posts: {user.posts}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export { UserDirectory };
