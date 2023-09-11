import React, { useEffect } from "react";
import "./CardFichePfe.css";
import pfe from "../../../Assets/images/pfe.png";
import { Avatar } from "@material-ui/core";
import { useHistory, withRouter } from "react-router";
const CardFichePfe = (props) => {
  const history = useHistory();
  useEffect(() => {
    console.log(props);
  }, []);
  const showPfeHandler = () => {
    //  history.push(`/homepage/teacher/fichepfe/:${props.idpfe}`);
    /*     history.push({
        pathname: '/home/teacher/fichepfe/:id',
        search: '?query=abc',
        state: { detail: props.idpfe }
    }); */
  };

  return (
    <div className="cardcontainer">
      <div className="imgcontainer">
        <Avatar className="avatarpfe" src={pfe} />
        <span style={{ margin: "2px" }}>
          <strong>ID-PFE : &nbsp;</strong>
          {props.idpfe}
        </span>
      </div>
      <div className="cardbody">
        <label style={{ padding: "2px" }}>
          <strong>Description PFE : </strong>
        </label>
        <div className="cardDescription">{props.pfedescription}</div>
      </div>
    </div>
  );
};

export default CardFichePfe;
