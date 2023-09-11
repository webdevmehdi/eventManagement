/* import React, { useState } from "react";
import espritLogo from "../../Assets/images/espritLogo.png";
import picture60 from "../../Assets/images/picture60.jpg";
import "./LoginForm.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";

//import { requestLogin } from "../../Redux-Actions/UserInfo-Actions/UserInfo-Actions";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../Redux-Actions/Alert-Actions/AlertActions";
import { Navigate, useNavigate } from "react-router-dom";
import useLogIn from "../../Hooks/useLogIn";
import {
  authentication,
  authenticate,
} from "../../features/authenticationSlice";
import TextField from "@mui/material/TextField";
import { Button, FormGroup } from "@mui/material";
const LoginForm = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.authentication.username);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const message = useSelector((state) => state.alert.message);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const isEmail = (email) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/i.test(email);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmit] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const requestLogin = useLogIn();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!isEmail(email)) {
      errors.email = "Veuillez vérifier votre adresse e-mail";
    }

    setErrors(errors);

    let authenticationObject = {
      email: email,
      password: password,
    };
    //   dispatch(requestLogin(email, password));

    //setSubmit(true);
  };

  return (
    <>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
      {username && isLoggedIn ? (
        <Navigate to="/home" />
      ) : (
        <div className="LoginPage">
          <form className="loginpage_form" onSubmit={handleSubmit}>
            <h2 className="Form_Title">Login</h2>
            <TextField
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              color="primary"
              required
              fullWidth
              value={email}
            />
            {Object.entries(errors).map(([key, errormessage]) => (
              <span style={{ color: "red", fontSize: "large" }} key={`${key}`}>
                {errormessage}
              </span>
            ))}
            <TextField
              label="Password"
              required
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              color="primary"
              value={password}
              fullWidth
            />
            <Button type="submit" variant="outlined">
              LOGIN
            </Button>
            <img
              className="login__form_img"
              src={picture60}
              alt="logoLoginForm"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
 */