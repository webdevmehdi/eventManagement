import { Avatar } from "@material-ui/core";
import React from "react";
import "./SideBarForum.css";
import image3 from '../../../Assets/images/img1.jpeg';
const SideBarForum = () => {
  return (
    <div className="SideBarForum">
      <div className="sidebar_top">
        <img src={image3} alt="profilebackgroundimage" />
        <Avatar  className="sidebar_avatar"/>
        <h2>Mehdi Azizi</h2>
        <h4>mehdiazizikef@gmail.com</h4>
      </div>
      <div className="sidebar_stats">
        <div className="sidebar_stat">
          <p>who viewed you</p>
          <p className="sidebar_statNumber">2.565</p>
        </div>
        <div className="sidebar_stat">
          <p>viewed the post</p>
          <p className="sidebar_statNumber">2.265</p>
        </div>
      </div>
     {/*  <div className="sidebar_bottom">
          <p>Recent</p>
      </div> */}
    </div>
  );
};

export default SideBarForum;
