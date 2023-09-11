import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import menu from "../../Assets/images/menu.png";
import "./Header.css";
import HeaderOptions from "./HeaderOptions/HeaderOptions";
import HomeIcon from "@material-ui/icons/Home";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Notifications } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import ForumIcon from "@material-ui/icons/Forum";
import { Route, useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import espritLogo from "../../Assets/images/espritLogo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import bookshelf from "../../Assets/images/bookshelf.png";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
//import FontAwesomeIcon from "@fortawesome/fontawesome-free";

const Pageheader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <nav className="header">
        <div className="header_left">
          <img
            src={espritLogo}
            style={{ height: "50px", borderRadius: "20px", marginLeft: "50px" }}
            alt="espritLogo"
          />
        </div>

        <div className="header_right">
          <HeaderOptions
            Icon={HomeIcon}
            title="Profile"
            iconHandler={() => navigate("/home")}
          />
          <HeaderOptions Icon={Notifications} title="Notifications">
            <div className="notifications-count">5</div>
          </HeaderOptions>

          <HeaderOptions
            Icon={LibraryBooksIcon}
            title="Library"
            iconHandler={() => navigate("/library")}
          />

          <HeaderOptions
            Icon={LogoutIcon}
            title="Logout"
            iconHandler={() => dispatch({ type: "USERS_LOGOUT" })}
          />
        </div>
      </nav>
    </>
  );
};

export default Pageheader;

/* <img classNameName="header__image" src={helmet} alt="helmet" /> */
