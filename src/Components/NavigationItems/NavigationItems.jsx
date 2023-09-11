import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationsItems.css";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
const NavigationItems = (props) => {
  return (
    <div className="NavigationItems">
      <NavLink
        to={{ pathname: `/home/teacher/${props.username}` }}
        style={{ textDecoration: "none" }}
      >
        <NavigationItem Icon={HomeIcon} title="Profile" />
      </NavLink>
      <NavLink to="/home/library" style={{ textDecoration: "none" }}>
        <NavigationItem Icon={LocalLibraryIcon} title="Librairie" />
      </NavLink>

      <NavLink to="/home/calendar" style={{ textDecoration: "none" }}>
        <NavigationItem Icon={CalendarTodayIcon} title="Calendrier" />
      </NavLink>
    </div>
  );
};

const mapStateToProps = (state) => {
  const username = state.authentication.username;

  return { username: username };
};

export default connect(mapStateToProps)(NavigationItems);
