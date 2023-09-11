import { IconButton } from '@material-ui/core'
import React from 'react'
import complete from "../../../../../../Assets/images/complete.png";
import "./TaskStatus.css";
const TaskStatus = (props) => {
    return (
        <div
        className={
          props.activeStatus ? "task_status activeStatus" : "task_status inactiveStatus"
        }
      >
        <IconButton onClick={props.selectTaskStatus}>
          <img height="20px" src={props.picture} alt="taskfinished" />
          <span style={{ fontSize: "10px" ,color:"rgb(0,0,0)"}}>
            {props.taskStatus}
          </span>
        </IconButton>
      </div>
    )
}

export default TaskStatus
