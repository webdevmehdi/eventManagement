import React from "react";
import { NavLink } from "react-router-dom";
import espritLogo from "../../../Assets/images/espritLogo.png";

const LandingPageHeader = () => {
  return (
    <div className="landingpage_header">
      <div className="landingpage_logo">
        <img src={espritLogo} alt="espritLogo" />
      </div>
      <div className="landingpage_signup">
        <NavLink
          style={{
            border: "1px solid lightgray",
            height: "30px",
            margin: "5px",
            padding: "10px",
            borderRadius: "15px",
            textDecoration: "none",
          }}
          to="/main/register"
        >
          SignUp
        </NavLink>
        <NavLink
          style={{
            border: "1px solid lightgray",
            width: "70px",
            height: "30px",
            margin: "5px",
            padding: "10px",
            borderRadius: "15px",
            textDecoration: "none",
          }}
          to="/login"
        >
          LogIn
        </NavLink>
      </div>
    </div>
  );
};

export default LandingPageHeader;
