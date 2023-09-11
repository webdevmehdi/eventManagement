import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
/* import { getHashValues } from "../../Utils/utils";
 */
import "./Calendar.css";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Button from "@material-ui/core/Button";
import listPlugin from "@fullcalendar/list";
import useEventCalendar from "../../Hooks/useCalendarEvent";

const CalendarFunctional = (props) => {
  const dispatch = useDispatch();
  const evenements = useSelector((state) => state.eventsById);
  const requestEvents = useEventCalendar();
  const [openening, setOpenening] = useState(false);
  const [eventSelectione, setEventSelectione] = useState();
  const [idS, setIdS] = useState();
  const [titre, setTitre] = useState();
  const [e, setE] = useState(props.events);
  const handleOpen = () => {
    setOpenening((prev) => !prev);
  };
  const handleClose = () => {
    setOpenening(false);
  };
  const handleCloseEvent = (value) => {
    setEventSelectione(value);
  };

  const handleEventSource = () => {
    requestEvents(props.username);
  };

  const handleEventClick = (clickInfo) => {
    setEventSelectione(true);
    setIdS(clickInfo.event.id);
    setTitre(clickInfo.event.title);
    props.eventClicked(eventSelectione);
    props.setIdSeance(idS);
  };

  return (
    <div className="Calendar">
      <div className="Calendar_layout">
        <FullCalendar
          height="500px"
          eventOverlap={false}
          selectOverlap={false}
          slotEventOverlap={false}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          initialView="dayGridMonth"
          eventSources={handleEventSource}
          
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          //  weekends={this.props.weekendsVisible}
          // datesSet={handleDates}
          // calendar  select={this.handleDateSelect}
         events={props.events}
          eventClick={evenements}
          //eventAdd={handleEventAdd}
          //eventChange={handleEventChange} // called for drag-n-drop/resize
          //eventRemove={handleEventRemove}
          slotDuration={{ minutes: 10 }}
          slotLabelInterval={{ minutes: 10 }}
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: false,
            hour12: false,
          }}
        />
      </div>

      <div>
        <Button
          onClick={props.handleOpen}
          style={{ height: "50px", margin: "5px" }}
          variant="contained"
          color="primary"
          startIcon={<EventNoteIcon />}
        >
          AJOUTER SEANCE ENCADREMENT
        </Button>
        <p>hello</p>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const getEventArray = createSelector(
    (state) => state.eventsById,
    getHashValues
  );
  let {eventsById}  = state.eventsById;
  let { username } = state.authentication;

  return (state) => {
    return {
      events: getEventArray(state),
      username: username,
      eventsById: eventsById,
    };
  };
}

export default connect(mapStateToProps)(CalendarFunctional);
