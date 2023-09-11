import React, { useState } from "react";
import Modal from "../../../UI/Modal/Modal";
import CalendarForm from "../../../CalendarForm/CalendarForm";

import cancel from "../../../../Assets/images/cancel.png";
import TaskModal from "./Task/TaskModal";
const Tache = () => {
  const [taskModalSelected, setTaskModalSelected] = useState(false);
  const handleTaskCard = (e) => {
    e.preventDefault();
    setTaskModalSelected(true);
  };
  const handleTaskStatus = (statut) => {
    setStatusTask(statut);
  };
  const handleClose = (value) => {
    setTaskModalSelected(value);
  };
  return (
    <>
      <div onClick={handleTaskCard} className="cardTaskContainer">
        <div style={{ display: "flex" }}>
          <label style={{ padding: "2px" }}>Task : </label>
          <span>Nom de la tache</span>
        </div>

        <div className="cardTaskbody">
          <label>Description :</label>
          <p
            style={{
              padding: "2px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            this is the description of the task if you want more details click
            on here
          </p>
        </div>
      </div>

      <Modal show={taskModalSelected} modalClosed={handleClose}>
        <TaskModal show={true} status={handleTaskStatus} />
      </Modal>
    </>
  );
};

export default Tache;
