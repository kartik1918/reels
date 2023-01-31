import React from 'react'
import "./Video.css"

const Video = (props) => {

    const handleClick = (e) => {
        e.preventDefault()
        e.target.muted = !e.target.muted 
    }
    
  return (
    <>
        <video src={props.src} className="video-stylinh" muted="muted" onClick={handleClick} controls></video>
    </>
  )
}

export default Video