import { Avatar } from "@material-ui/core";
import React from "react";
import "./ProgEtudiant.css";
import Progressiontask from "./Progressiontask/Progressiontask";
import "./ProgEtudiant.css";
import test3 from "../../Assets/images/test3.jpg";
import test4 from "../../Assets/images/test4.jpeg";

import ProgressionTicket from "./Progressiontask/ProgressionTicket/ProgressionTicket";
const ProgEtudiant = (props) => {
  return (
    <div className="user_profil">
      <div className="left_profile_user">
        <Avatar />
        <h1>Student</h1>
      </div>
      <div className="right_profile_user">
<div className="progression_sujet">
  <label className="progression_sujet_label" > Sujet : </label>
  <article className="progression_sujet_sujet"> nom du sujet pfe</article>
</div>

        <ProgressionTicket title="Description "> Description  </ProgressionTicket>
        <div className="progression_bars">
          <Progressiontask
            /* image={test3}
            progressvalue={props.progression}
            title="Progression Technique" */
          />
          <Progressiontask
           /*  image={test3}
            progressvalue={props.progression}
            title="Progression Rapport" */
          />
          <Progressiontask
           /*  image={test4}
            progressvalue={props.progression}
            title="Progression AutoFormation" */
          />
        </div>
      </div>
    </div>
  );
};

export default ProgEtudiant;
