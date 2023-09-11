import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import EventModal from "../EventModal";

const EventModalContainer = (props) => {
  const [event, setEvent] = useState(props.selectedEvent);
  const selectedEvent = useSelector((state)=>state.selectedEvent)
  const closeEvenementModal = (value) => {
    props.eventSelect(value);
  };
  console.log(event);

  return (
    <div className="EvenementModal">
      <p>{selectedEvent}</p>
      <EventModal closeEvent={closeEvenementModal} />
      {/* {props.selectedEvent && (
      
          eventTitle={event.title}
          eventStart={event.start}
          eventEnd={event.end}
          idSeance={event.id}
          closeEvent={closeEvenementModal}
        />
      )} */}
    </div>
  );
};

const mapStateToProps = (state) => {
  //const { user } = state.authentication;
  const selectedEvent = state.events.selectedEvent;
  return { selectedEvent: selectedEvent };
};

export default connect(mapStateToProps)(EventModalContainer);
