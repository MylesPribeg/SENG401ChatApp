import React from "react";
import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { logOut } = useLogOut();
  const { user } = useAuthContext();
  const handleClick = () => {
    logOut();
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleClick}>LogOut</button>
      {user && (
        <div>
          <span>{user.username}</span>
        </div>
      )}
    </div>
  );
}
