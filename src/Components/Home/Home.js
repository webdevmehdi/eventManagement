import React, { useEffect, useState } from "react";
import Pageheader from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import "./Home.css";
import { Navigate, Route, useNavigate } from "react-router-dom";
import userActions from "../../Redux-Actions/UserInfo-Actions/UserInfo-Actions";
import { connect, useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const Home = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  //  const dateTimePicker = useDateTimePicker();
  //  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  const [progression, setProgression] = useState(0);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSideBar = () => {
    setSideBar((prev) => (prev = !prev));
  };
  const handleOpen = () => {
    setOpen((prev) => (prev = !prev));
  };
  const logOutHandler = () => {
    dispatch(userActions.requestLogOut());
    navigate("/");
  };
  //console.log(open);
  /*  useEffect(() => {
let email = "ma@ma" ;
   axios.get(`http://localhost:8081/geteventByEmail/${email}`,{withCredentials:true})
  
  }, [])  */

  return (
    <div className="home">
      <Outlet />
    </div>
  );
};
const mapStateToProps = (state) => {
  const { loggingIn } = state.authentication;
  const { user } = state.authentication;
  return { user: user, loggingIn: loggingIn };
};
export default connect(mapStateToProps)(Home);
