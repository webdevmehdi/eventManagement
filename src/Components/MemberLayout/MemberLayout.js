import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import "./Memberlayout.css";
import "../../Assets/fonts/fontGoogle.css";
import _ from "lodash";
import axios from "axios";
import FichePfe from "../../Components/ListFichePfe/FichePfe/FichePfe";
import MyResponsivePie from "../Charts/PieCharts/PieChart";
import { Avatar } from "@material-ui/core";
import Calendar from "../Calendar/Calendar";
import CalendarForm from "../CalendarForm/CalendarForm";
import Modal from "../UI/Modal/Modal";
/* const ResponsiveReactGridLayout = WidthProvider(Responsive);
 */
const MemberLayout = (props) => {
  const [itemNumber, setItemNumber] = useState(1);
  let el = document.getElementById("description");

  const [val, setVal] = useState(false);
  /*   useEffect(() => {
    let items = [];
    items = axios
      .get("http://localhost:8081/getTasks")
      .then((response) => setItems(response.data));
  }, []); */
  const editTextHandler = () => {
    let el = document.getElementById("description");
    console.log(el.innerText);
    setVal((prev) => (prev = !prev));
  };
  const idHandler = (value) => {
    setIdSeance(value);
    dispatch(actionCreators.requestEvenement(value));
    console.log("dispatch sent");
  };
  const selectHandler = (eventSelectione) => {
    setSelected(eventSelectione);
  };
  return (
    <>
      <div className="teacherLayout">
        <div className="teacher_layout_top">
          <Avatar />
          <span>Welcome To </span>
          <h6>{props.username}</h6>
        </div>
        <div className="teacher_layout_mid">
          <Calendar
            handleOpen={props.handleOpen}
            setIdSeance={idHandler}
            eventClicked={selectHandler}
          />
          <Modal show={props.opening} modalClosed={props.handleOpen}>
            <CalendarForm formHandler={props.handleClose} />
          </Modal>
        </div>
      </div>

      <FichePfe />
    </>
  );
};

export default MemberLayout;
