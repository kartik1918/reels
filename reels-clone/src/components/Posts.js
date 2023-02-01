import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Video from "./Video";
import Like from "./Like";
import "./Posts.css";

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
      {posts == null || userData == null ? (
        <CircularProgress />
      ) : (
        <div className="video-container">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              <div className="videos">
                <Video src={post.pUrl} />
                <div className="avatar" style={{ display: "flex" }}>
                  <Avatar src={userData.profileUrl} />
                  <h4>{userData.fullName}</h4>
                </div>
                <Like userData={userData} postData={post}/>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
