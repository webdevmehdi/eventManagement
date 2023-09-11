import React, { useState } from "react";
import { useHistory } from "react-router";
import TextField from "@mui/material/TextField";

import {
  requestRegisterEnseignant,
  requestRegisterEtudiant,
} from "../../Redux-Actions/UserInfo-Actions/UserInfo-Actions";
import { connect, useDispatch, useSelector } from "react-redux";
import AccountTypeCard from "../Login/AccountTypeCard/AccountTypeCard";
import studentGraduation from "../../Assets/images/studentGraduation.jpg";
import teacherModified1 from "../../Assets/images/teacherModified1.jpg";
import "./Register.css";
import { useRef } from "react";
import Alert from "@material-ui/lab/Alert";
import { NavLink } from "react-router-dom";
import { alertActions } from "../../Redux-Actions/Alert-Actions/AlertActions";
import { last, set } from "lodash-es";
import { typeOf } from "../../../dist/main";

const RegisterForm = (props) => {
  let history = useHistory();
  let dispatch = useDispatch();
  let userInfo = {
    nom: "",
    prenom: "",
    email: "",
    password: "",
    photoUrl: "",
    roles: [{ name: "" }],
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [validPassword, setValidPassword] = useState(false)
  const [role, setRole] = useState("");
  const array = ["STUDENT", "TEACHER"];
  const [accountType, setAccountType] = useState({ activeObject: null, array });
  const [submitted, setSubmitted] = useState(false);

  let cardEtudiantRef = useRef(null);
  let cardEnseignantRef = useRef(null);
  const [bgColor, setBgColor] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);

  const handleLogin = () => {
    history.push("/login");
    dispatch(alertActions.clear());
  };
  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };
  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const ConfirmpasswordHandler = (event) =>{

    setConfirmPassword(event.target.value);
    console.log(confirmPassword)


  }
/*   const handlePasswordCheck = () => {
    //console.log(typeOf())
    return false
  } */
  const handleSubmit = (e) => {
    e.preventDefault();

    userInfo = {
      email: email,
      password: password,
      role: { name: role },
    };
    setSubmitted(true);

    if (role === "TEACHER") {
      console.log("dispatching enseignant register");
      console.log(userInfo);
      dispatch(requestRegisterEnseignant(userInfo));
    } else if (role === "STUDENT") {
      console.log("dispatching etudiant register");

      dispatch(requestRegisterEtudiant(userInfo));
    }
  };

  const chooseAccountTypeHandler = (index) => {
    setAccountType({ ...accountType, activeObject: accountType.array[index] });
    setRole(accountType.array[index]);
    console.log(role);
  };
  const toggleActive = (index) => {
    if (accountType.array[index] === accountType.activeObject) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="registerPage">
      {submitted && props.isRegistered ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="alert alert-success" role="alert">
            {props.message} you can login now
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid lightblue",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          {submitted && props.message && (
            <div className="alert alert-info" role="alert">
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {props.message}
              </p>
            </div>
          )}
          <div className="registerpage_top">
            <span style={{ textAlign: "center" }}>
              <h2>Choisissez Type de Compte</h2>
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                margin: "10px",
              }}
            >
              <div className="registerpage_top_cards">
                {array.map((element, index) => (
                  <AccountTypeCard
                    accountType={() => chooseAccountTypeHandler(index)}
                    key={index}
                    title={element}
                    picture={studentGraduation}
                    active={toggleActive(index)}
                  />
                ))}
              </div>
              {submitted && !role && (
                <Alert variant="outlined" severity="error">
                  Veuillez choisir type de compte
                </Alert>
              )}
            </div>
          </div>
          <form className="registerpage_form" onSubmit={(e) => handleSubmit(e)}>
            <TextField
              label="Nom"
              onChange={firstNameHandler}
              value={firstName}
              variant="outlined"
              helperText={
                !firstName && submitted && "Veuillez introduire un nom"
              }
              error={!firstName && submitted}
            />
            <TextField
              label="Prenom"
              onChange={lastNameHandler}
              value={lastName}
              variant="outlined"
              helperText={
                !lastName && submitted && "Veuillez introduire un prenom"
              }
              error={!firstName && submitted}
            />

            <TextField
              label="Mot de Passe"
              onChange={passwordHandler}
              value={password}
              variant="outlined"
              helperText={
                !password && submitted && "Veuillez introduire mot de passe"
              }
              error={!password && submitted}
            />
             <TextField
              label="Confirmer Mot de passe"
              onChange={ConfirmpasswordHandler}
              value={confirmPassword}
              variant="outlined"
              helperText={
                !validPassword && submitted && "Veuillez verifier votre mot de passe"
              }
               /* error={handlePasswordCheck()}  */
            />
            {confirmPassword}
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { message } = state.alert;
  return { message: message };
};
export default connect(mapStateToProps)(RegisterForm);
