import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideBar.css";
import espritLogo from "../../Assets/images/espritLogo.png";
import { IconButton } from "@material-ui/core";
import close from "../../Assets/images/close.png";
const SideBar = (props) => {
  //  const [users , setUsers]
  return (
    <div
      className="Sidebar"
      style={{
        transform: props.show ? "translateX(0)" : "translateX(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      <div className="top_sidebar">
        <img className="sidebar_logo" src={espritLogo} alt="espritLogo" />
        <IconButton
          style={{ fontSize: "12px", border: "1px solid lightgray" }}
          onClick={props.modalClosed}
        >
          <img src={close} height="25px" alt="topsidebar_image" />
        </IconButton>
      </div>
      <NavigationItems />
    </div>
  );
};
export default SideBar;
