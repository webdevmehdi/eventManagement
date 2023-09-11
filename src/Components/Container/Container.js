import { Outlet, useHistory, useNavigate } from "react-router-dom";
import espritLogo from "../../Assets/images/espritLogo.png";
import React, { useState } from "react";
import LandingPage from "../LandingPage/LandingPage";
import Home from "../Home/Home";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import Register from "../Register/Register";
import LoginForm from "../Login/LoginForm";
import "./Container.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import TeacherLayout from "../TeacherLayout/TeacherLayout";
import MemberLayout from "../MemberLayout/MemberLayout";
import FichePfe from "../ListFichePfe/FichePfe/FichePfe";
import Category from "../Librairie/Category/Category";
import Librairie from "../Librairie/Librairie";
import PrivateRoute from "../PrivateRoute";
import PersistLogin from "../Login/PersistLogin";
import Calendar from "../Calendar/Calendar";
import Pageheader from "../Header/Header";
import Task from "../ListFichePfe/FichePfe/TaskList/Task/TaskModal";
export const Container = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen((prev) => (prev = !prev));
  };

  return (
    <>
      {/*  <Backdrop show={open} clicked={handleClose} /> */}

      <Routes>
        {/* public routes */}
        <Route exact path="/" element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="library" element={<Librairie />}>
          <Route path=":categorie" element={<Category />} />
        </Route>

        {/* protected routes */}
        {/* <Route element={<PersistLogin />}> */}
        {/*   <Route element={<PrivateRoute />}> */}
       {/*  <Route path="home" element={<Home />}> */}
          <Route path="member" element={<MemberLayout />} />
          <Route path="teacher" element={<TeacherLayout />} />
          <Route path="teacher/fichepfe" element={<FichePfe />} />
        {/* </Route> */}
        {/*  </Route> */}
        {/*     </Route> */}
      </Routes>
    </>
  );
};

export default Container;
