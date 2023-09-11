import React from "react";
import "./Forum.css";
import Sidebar from "./SideBarForum/SideBarForum";
import LandingPageHeader from "../LandingPage/LandingPageHeader/LandingPageHeader";
import FeedForum from "./FeedForum/FeedForum";
const Forum = () => {
  return (
    <div className="forum">
      <div className="forum_main">
        <Sidebar />
        <FeedForum/>
        <div>
          hello
        </div>
      </div>
    </div>
  );
};

export default Forum;
