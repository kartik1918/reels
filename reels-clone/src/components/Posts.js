import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";

const Posts = ({ userData }) => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    let parr = [];
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        parr = [];
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          parr.push(data);
        });
        setPosts(parr);
      });
    return () => {
      unsub();
    };
  }, []);
  return (
    <div>
      {posts == null || userData == null ? <CircularProgress /> : <>Posts</>}
    </div>
  );
};

export default Posts;
