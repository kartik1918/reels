import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar";
import CommentLike from "./CommentLike";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import AddComment from "./AddComment";
import Comments from "./Comments";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    database.users.doc(id).onSnapshot((snap) => {
      setUserData(snap.data());
    });
  }, [id]);

  const getUserPosts = async () => {
    if (userData != null) {
      const parr = [];
      for (let i = 0; i < userData.postIds.length; i++) {
        const postData = await database.posts.doc(userData.postIds[i]).get();
        parr.push({...postData.data(), postId: postData.id});
      }
      setPosts(parr);
    }
  };

  useEffect(() => {
    getUserPosts();
  });

  return (
    <>
      {posts == null || userData == null ? (
        <CircularProgress />
      ) : (
        <>
          <Navbar userData={userData} />
          <div className="spacer"></div>
          <div className="container">
            <div className="upper-part">
              <div className="profile-img">
                <img src={userData.profileUrl} />
              </div>
              <div className="info">
                <Typography variant="h5">Email: {userData.email}</Typography>
                <Typography variant="h6">
                  Posts: {userData.postIds.length}
                </Typography>
              </div>
            </div>
            <hr style={{ marginTop: "3rem", marginBottom: "3rem" }} />
            <div className="profile-videos">
              {posts.map((post, index) => (
                <React.Fragment key={index}>
                  <div className="videos">
                    <video
                      muted="muted"
                      onClick={() => handleClickOpen(post.pId)}
                    >
                      <source src={post.pUrl} />
                    </video>
                    <Dialog
                      open={open == post.pId}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth={true}
                      maxWidth="md"
                    >
                      <div className="modal-container">
                        <div className="video-modal">
                          <video autoplay={true} muted="muted" controls>
                            <source src={post.pUrl} />
                          </video>
                        </div>
                        <div className="comment-modal">
                          <Card className="card1" style={{ padding: "1rem" }}>
                            <Comments postData={post} />
                          </Card>
                          <Card variant="outlined" className="card2">
                            <Typography style={{ padding: "0.4rem" }}>
                              {post.likes.length === 0
                                ? ""
                                : `Liked by ${post.likes.length} users`}
                            </Typography>
                            <div style={{ display: "flex" }}>
                              <CommentLike
                                postData={post}
                                userData={userData}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              />
                              <AddComment userData={userData} postData={post} />
                            </div>
                          </Card>
                        </div>
                      </div>
                    </Dialog>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Profile;
