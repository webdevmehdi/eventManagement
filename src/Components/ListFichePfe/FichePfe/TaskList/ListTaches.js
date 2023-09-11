import React, { useEffect, useState } from "react";
import Task from "./Task/TaskModal";
import "./ListTaches.css";
import tasks from "../../../../Assets/images/tasks.jpg";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import cancel from "../../../../Assets/images/cancel.png";
import Modal from "../../../UI/Modal/Modal";
import CalendarForm from "../../../CalendarForm/CalendarForm";
import Tache from "./Tache";

const ListTaches = (props) => {
  const [listTaches, setListTaches] = useState([]);
  const [taskModalSelected, setTaskModalSelected] = useState(false);
  const handleTaskCard = (e) => {
    e.preventDefault();
    setTaskModalSelected(true);
  };
  const handleClose = (value) => {
    setTaskModalSelected(value);
  };
  useEffect(() => {
    /*   axios
      .get(
        `http://localhost:8081/getTasksByFichePfeId/${props.user.fichepfe.id}`
      )
      .then((response) => {
        setListTaches(response.data);
      }); */
  }, []);
  const description =
    "this is the description of the user's task number 1 with full details";
  const taskN = "this is the task name";
  return (
    <div className="listTaches">
      <div className="TaskList_top">
        <img className="taskImage" src={tasks} alt="tasks" />
        <label> Tâches : </label>
      </div>
      <div className="listTaches_bottom">
        <Tache />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  return { user: user };
};

export default connect(mapStateToProps)(ListTaches);

/*   <div className="TaskList">
          {props.listTaches.map((tache) => (
            <Task
              key={tache.id}
              idTache={tache.id}
              taskName={tache.name}
              taskDescription={tache.decription}
              taskStatus={tache.status}
            />
          ))}
          <Task taskDescription={description} taskName={taskN} />
          <Task />
          <Task />
          <Task />
          <Task />
        </div> */
