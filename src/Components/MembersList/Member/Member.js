import React from "react";
import "./Member.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Avatar, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const Member = (props) => {
  const memberCard = () => {
    
  };
  return (
    <tr>
      <td style={{ padding: "30px" }}>
        <span>{props.email}</span>
      </td>
      <td style={{ padding: "30px" }}>
        <span>{props.titre}</span>
      </td>
      <td style={{ padding: "30px 0px" }}>
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={memberCard}>
          <AccountCircleIcon />
        </IconButton>
      </td>
    </tr>
  );
};

export default Member;
