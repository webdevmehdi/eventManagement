import React, { useState, useEffect } from "react";
import "../../Assets/fonts/fontGoogle.css";
/* import _ from "lodash";
 */ import Calendar from "../Calendar/Calendar";
import CalendarForm from "../CalendarForm/CalendarForm";
import "./TeacherLayout.css";
import { Avatar } from "@material-ui/core";
import Modal from "../UI/Modal/Modal";
import ListFichePfe from "../../Components/ListFichePfe/ListFichePfe";
import Members from "../MembersList/Members";
import { connect, useDispatch } from "react-redux";
import { getEvent } from "../../features/eventSlice";
import EventModal from "../Calendar/EventModal/EventModal";
import { useSelector } from "react-redux";
import Pageheader from "../Header/Header";
import { Outlet } from "react-router-dom";
const TeacherLayout = (props) => {
  const dispatch = useDispatch();
  const event = useSelector((state) => state.selectedEvent);
  const [listEtudiants, setListEtudiants] = useState([]);
  const [selected, setSelected] = useState(false);
  const [idSeance, setIdSeance] = useState("");
  const [sideBarSelected, setSideBarSelected] = useState(false);

  const [open, setOpen] = useState(false);

  const selectHandler = (eventSelectione) => {
    setSelected(eventSelectione);
  };
  const eventModalCloseHandler = (value) => {
    setSelected(value);
  };
  const handleClose = (value) => {
    console.log(value);
    setOpen(value);
  };
  const handleOpen = (value) => {
    setOpen((prev) => (prev = !prev));
  };

  const idHandler = (value) => {
    setIdSeance(value);
    dispatch(getEvent(value));
  };

  return (
    <>
      <div className="teacherLayout">
        <div className="teacher_layout_top">
          <Avatar />
          <span>Welcome</span>
          <h6>{props.username.split("@")[0]}</h6>
        </div>
        <div className="teacher_layout_mid">
          <Calendar
            handleValue={handleOpen}
            setIdSeance={idHandler}
            eventClicked={selectHandler}
          />
          <Modal show={open} modalClosed={handleClose}>
            <CalendarForm formHandler={handleClose} />
          </Modal>

          {selected /* && idSeance */ && (
            <EventModal
              idSeance={idSeance}
              selected={selected}
              closeEvent={eventModalCloseHandler}
            />
          )}

          <div className="teacher_charts">CHARTS</div>
        </div>
        <div className="teacher_layout_bottom">
          <Members listEtudiants={listEtudiants} />
          <ListFichePfe />
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  const { username } = state.authentication;
  return { username: username };
};

export default connect(mapStateToProps)(TeacherLayout);
