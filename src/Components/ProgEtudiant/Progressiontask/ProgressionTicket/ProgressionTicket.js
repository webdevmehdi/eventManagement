import React from 'react'
import "./Progressionticket.css";
const ProgressionTicket = ({title, children}) => {
    return (
        <div  className="Progression_ticket" >
            <label className="Progression_ticket_label" >{title}: </label>
            <article className="Progression_ticket_description">{children}</article>
        </div>
    )
}

export default ProgressionTicket;
