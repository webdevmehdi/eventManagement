import React, { useState } from "react";
import "./ProgressionTask.css";
import LinearProgress from "@material-ui/core/LinearProgress";

const Progressiontask = ({ title, progressvalue, image }) => {
  return (
    <div className="progression_task">
      <div className="progression_task_left">
        <img src={image} />
      </div>
      <div className="progression_task_right">
        <h3>{title}</h3>

        <LinearProgress variant="determinate" value={progressvalue} />
      </div>
    </div>
  );
};

export default Progressiontask;

/* 
        <Progress
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          percent={progressvalue}
          
        /> */
