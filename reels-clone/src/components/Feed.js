import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Feed = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <h1>Welcome to feed</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Feed;
