import React from "react";
import ReactDOM from "react-dom"
import "./Video.css";

const Video = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };

  const handleScroll = (e) => {
    const next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
    if (next) {
        next.scrollIntoView()
        e.target.muted = true
    }
  }

  return (
    <>
      <video
        src={props.src}
        className="video-styling"
        onEnded={handleScroll}
        muted="muted"
        onClick={handleClick}
      ></video>
    </>
  );
};

export default Video;
