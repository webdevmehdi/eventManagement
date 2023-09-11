import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
/* import { getHashValues } from "../../Utils/utils";
 */ import "./Calendar.css";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Button from "@material-ui/core/Button";
import listPlugin from "@fullcalendar/list";
import { getEvents } from "../../features/eventSlice";
import CalendarForm from "../CalendarForm/CalendarForm";
import Modal from "../UI/Modal/Modal";
class Calendar extends React.Component {
  state = {
    titre: "",
    nom: "",
    openening: false,
    idS: "",
    isEditable: false,
    eventSelectione: false,
  };

  componentDidUpdate() {}

  render() {
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
            eventSources={this.handleEventSource}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.props.weekendsVisible}
            datesSet={this.handleDates}
            select={this.handleDateSelect}
            events={this.props.events}
            eventClick={this.handleEventClick}
            // eventAdd={this.handleEventAdd}
            /// eventChange={this.handleEventChange} // called for drag-n-drop/resize
            // eventRemove={this.handleEventRemove}
            //   slotDuration={{ minutes: 10 }}
            // slotLabelInterval={{ minutes: 10 }}
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
            onClick={this.handleOpen}
            style={{ height: "50px", margin: "5px" }}
            variant="contained"
            color="primary"
            startIcon={<EventNoteIcon />}
          >
            AJOUTER SEANCE ENCADREMENT
          </Button>
        </div>
      </div>
    );
  }

  handleOpen = () => {
    let { openening } = this.state;
    this.setState({ openening: !openening });
    this.props.handleValue(this.state.openening);
  };
  handleClose = () => {
    this.setState({ openening: false });
  };
  handleCloseEvent = (value) => {
    this.setState((prev) => ({ ...prev, eventSelectione: value }));
  };

  handleEventSource = () => {
    this.props.events;
  };

  handleEventClick = (clickInfo) => {
    this.setState((prev) => ({
      ...prev,

      eventSelectione: true,
      idS: clickInfo.event.id,
      titre: clickInfo.event.title,
    }));

    this.props.eventClicked(this.state.eventSelectione);
    this.props.setIdSeance(this.state.idS);
    console.log(this.props);
  };

  handleEventAdd = (addInfo) => {
    this.props.createEvent(addInfo.event.toPlainObject()).catch(() => {
      reportNetworkError();
      addInfo.revert();
    });
  };

  handleEventChange = (changeInfo) => {
    this.props.updateEvent(changeInfo.event.toPlainObject()).catch(() => {
      reportNetworkError();
    });
  };
}

function mapStateToProps(state) {
  const events = state.events.evenements;
  let { username } = state.authentication;

  return {
    events: events,
    username: username,
  };
}
const mapDispatchToProps = (dispatch) => {
  // dispatching plain actions
  return { getEvents: dispatch(getEvents()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
