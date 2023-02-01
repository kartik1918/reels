import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { database } from "../firebase";
import UploadFile from "./UploadFile";
import { Button } from "@mui/material";
import Posts from "./Posts";

const Feed = () => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
    return () => {
      unsub();
    };
  }, [user]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="comp" style={{ width: "50%" }}>
        <h1>Welcome to feed</h1>
        <Button color="primary" variant="contained" onClick={logout}>Log Out</Button>
      </div>
      <UploadFile user={userData} />
      <Posts userData={userData}/>
    </div>
  );
};

export default Feed;
