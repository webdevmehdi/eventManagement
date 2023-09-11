import "./AccountType.css";

import React, { forwardRef, useState } from "react";
import complete from "../../../Assets/images/complete.png";
const AccountTypeCard = (props /* , ref */) => {
  const [active, setActive] = useState(false);
  /* const toggleActive = () => {
    setActive((prev) => (prev = !prev));
  }; */
  return (
    <>
      <div
        /*         ref={ref}
         */ onClick={props.accountType}
        className={
          props.active
            ? "accountTypecard activeMod"
            : "accountTypecard inactiveMod"
        }
      >
        <div className="overlay"></div>
        <div className="chooseAccountCircle">
          <img
            style={{ height: "64px", borderRadius: "57%", width: "64px" }}
            src={props.picture}
            alt="rolepicture"
          />
        </div>
        <div style={{ display: "flex", position: "relative" }}>
          <p style={{ marginBottom: "0" }}>{props.title}</p>
        </div>
        {props.roleChecked && <img className="imageRole" src={complete} />}
      </div>
    </>
  );
};
/* const forwardCard = React.forwardRef(AccountTypeCard);
 */ export default AccountTypeCard;
