import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
//import { Link, withRouter } from "react-router-dom";
import "./HeaderOptions.css";
const HeaderOptions = ({ avatar, title, Icon, iconHandler,children }) => {
  return (
    <div className="header__options" onClick={iconHandler}>
      {Icon && <Icon className="headerOptions__icon" />}

      {avatar && <Avatar className="headerOptions__icon" src={avatar} />}

      <h3 className="headerOptions__title">{title}</h3>
      {children}
    </div>
  );
};

export default HeaderOptions;
