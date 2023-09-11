import React, { useEffect, useRef, useState } from "react";
import "./Task.css";
import confirmTask from "../../../../../Assets/images/confirmTask.png";
import complete from "../../../../../Assets/images/complete.png";
import completedtask from "../../../../../Assets/images/completedtask.png";
import cancel from "../../../../../Assets/images/cancel.png";
import calendar1 from "../../../../../Assets/images/calendar1.png";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { DeleteForeverOutlined, DeleteOutline } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import axios from "axios";
import TaskStatus from "./TaskStatus/TaskStatus";
const TaskModal = (props) => {
  const statusArray = [
    { status: "FINIE", picture: complete },
    { status: "ENCOURS", picture: completedtask },
  ];
  // const colors = ["", "bloqueé", "red", "green", "yellow"];
  const [statutTask, setStatusTask] = useState("");

  const [editable, setEditable] = useState(false);
  const [text, setText] = useState(props.taskDescription);
  const [taskStatus, setTaskStatus] = useState(props.taskStatus);
  const [taskName, setTaskName] = useState(props.taskName);
  const [activeStatus, setActiveStatus] = useState(false);
  const [statusSelected, setStatusSelected] = useState({
    activeObject: null,
    statusArray,
  });
  const handleChange = (e) => {
    setStatusTask(e.target.value);
  };
  /*  const toggleActive = (index) => {
    if (statusSelected.statusArray[index] === statusSelected.activeObject) {
      return true;
    } else {
      return false;
    }
  }; */
  const selectTaskStatusHandler = (index) => {
    setStatusSelected({
      ...statusSelected,
      activeObject: statusSelected.statusArray[index],
    });
  };
  let textRef = React.useRef();
  const setNewText = (e) => {
    setText(e.target.value);
  };
  /* 
  const selectTaskStatusHandler = (index) => {
    setActiveStatus({ ...statusSelected, activeObject: statusArray[index] });
        setActiveStatus(true);
      // setTaskStatus(e.currentTarget.textContent);
  }; */

  const taskNameHandler = (e) => {
    setTaskName(e.target.value);
  };
  const cancelEditHandler = () => {
    setEditable(false);
  };
  const saveTextHandler = () => {
    console.log(taskName);
    /*   axios.put(
      `http://localhost:8081/modifierDescriptionTache/${props.idTache}/${text}`
    ); */
    axios.put(
      `http://localhost:8081/modifierStatusTache/${props.idTache}/${taskStatus}`
    );
    axios.put(
      `http://localhost:8081/modifierNomTache/${props.idTache}/${taskName}`
    );
    setEditable(false);
  };

  const editTextHandler = () => {
    setEditable(true);
  };

  return (
    <div className="task">
      <div className="task_info">
        <div className="task_info_name">
          <label className="labelTaskTitle">
            <strong>Task :&nbsp; </strong>
          </label>
          {!editable ? (
            <span className="task_info_name_description_editable">
              this the task name
            </span>
          ) : (
            <textarea
              className="task_info_name_description_noneditable"
              contentEditable={editable}
              suppressContentEditableWarning={true}
              defaultValue={taskName}
              onChange={taskNameHandler}
            />
          )}
        </div>
        <div className="task_description">
          <label className="labelTask">
            <strong>Description &nbsp; </strong>
          </label>

          {!editable ? (
            <div className="task_description_noneditable">{text}</div>
          ) : (
            <textarea
              className="task_description_editable"
              contentEditable={editable}
              suppressContentEditableWarning={true}
              defaultValue={text}
              onChange={setNewText}
            />
          )}
        </div>
      </div>

      <div className="task_bottom_bar">
        <div className="task_bottom_bar_operations">
          {editable ? (
            <>
              <div className="statut_list">
                <label>Status:&nbsp;&nbsp;</label>
                <select
                  value={statutTask}
                  onChange={(e) => setStatusTask(e.target.value)}
                >
                  <option style={{ backgroundColor: "red" }}>blocked</option>
                  <option>finished</option>
                  <option>in progress</option>
                  <option>revised</option>
                </select>

                {statutTask}
              </div>
              <IconButton onClick={saveTextHandler}>
                {/* <div className="task_bottom_bar_save"> */}
                <img
                  style={{
                    height: "40px",
                    border: "1px solid",
                    borderRadius: "20px",
                  }}
                  src={confirmTask}
                  alt="confirmchange"
                />
                {/*  </div> */}
              </IconButton>
              <IconButton
                style={{ border: "1px solid" }}
                onClick={cancelEditHandler}
              >
                <img src={cancel} height="20px" alt="cancelEditimg" />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                style={{ border: "1px solid" }}
                onClick={editTextHandler}
              >
                <CreateIcon />
              </IconButton>
              <IconButton style={{ border: "1px solid" }}>
                <DeleteOutline />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
