import React from "react";
import "./FichePfeDetail.css";
import { Avatar } from "@material-ui/core";
import pfe from "../../../../Assets/images/pfe.png";

const FichePfeDetail = (props) => {
  return (
    <div className="fichepfedetail">
      <div className="imgcontainer">
        <Avatar className="avatarpfe" src={pfe} />
        <span style={{ margin: "2px" }}>
          <strong>ID-PFE : &nbsp;</strong>
          {props.id}
        </span>
      </div>
      <div className="cardbody">
        <label style={{ padding: "2px" }}>
          <strong>Description PFE : </strong>
        </label>
        <p> {props.description}</p>
      </div>
    </div>
  );
};

export default FichePfeDetail;
