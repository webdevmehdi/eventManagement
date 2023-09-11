import React from "react";
import "./FeedForum.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOptions from "./InputOptions/InputOptions";
import ImageIcon from "@material-ui/icons/Image";
import { Avatar } from "@material-ui/core";
import Post from "../Posts/Post";
const FeedForum = () => {
  return (
    <div className="feed">
      <div className="feed_inputContainer">
       
        <div style={{display: 'flex'}}>
        <Avatar />
          <button className="feed_input" >Send</button>
        </div>
        <div className="feed_inputOptions">
          <InputOptions Icon={ImageIcon} title={"Photo"} color="#7085F9" />
          <InputOptions Icon={ImageIcon} title={"Video"} color="#E7AE33" />
          <InputOptions
            Icon={ImageIcon}
            title={"Write Article"}
            color="#7FC15E"
          />
        </div>
      </div>
      
      <Post/>
    </div>
  );
};

export default FeedForum;
