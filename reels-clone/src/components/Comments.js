import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar } from "@mui/material";
import { database } from "../firebase";

const Comments = ({ postData }) => {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    storeComments();
  }, [postData]);

  const storeComments = async () => {
    let arr = [];
    for (let i = 0; i < postData.comments.length; i++) {
      let data = await database.comments.doc(postData.comments[i]).get();
      arr.push(data.data());
    }
    setComments(arr);
  };

  return (
    <div>
      {comments == null ? (
        <CircularProgress />
      ) : (
        <>
          {comments.map((comment, index) => (
            <div style={{ display: "flex" }}>
              <Avatar src={comment.uProfileImage} />
              <p>
                &nbsp;&nbsp;
                <span style={{ fontWeight: "bold" }}>{comment.uName}</span>
                &nbsp;&nbsp;{comment.commentText}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
