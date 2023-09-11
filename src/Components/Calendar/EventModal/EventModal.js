import React, { useEffect, useLayoutEffect, useState } from "react";
import save from "../../../Assets/images/save.png";
import cancel from "../../../Assets/images/cancel.png";
import { DeleteForeverOutlined, DeleteOutline } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import "./EventModal.css";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import SideBarModal from "../EventModal/SideBarModal/SideBarModal";
import Arrow from "../../../Assets/images/Arrow.svg";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getEvent,deleteEvent } from "../../../features/eventSlice";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import deleteUserData from "../../../Assets/images/deleteUserData.svg";
const EventModal = (props) => {
  let eventSelected = {
    title: "",
    start: "",
    end: "",
    partcipants: [],
  };
  const newEvent = useSelector((state) => state.events.selectedEvent);
  const events = useSelector((state) => state.events.evenements);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [eventTitle, setEventTitle] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [showList, setShowList] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  /*   useLayoutEffect(() => {
    let isMounted = true;
    let controller = new AbortController();

    axiosPrivate
      .get(`http://localhost:8081/retrouverEventById/${props.idSeance}`, {
        withCredentials: true,
        signal: controller.signal,
      })
      .then((response) => {
        console.log(response);
        setEvenement(response.data);
      });
    return () => {
      isMounted = false;
    };
  }, []); */
  const setNewText = (e) => {
    setText(e.target.value);
  };
  const deleteEventHandler = () => {
    let idSeance = props.idSeance;
    dispatch(deleteEvent({events,idSeance}));
    //props.closeEvent(false);
  }
  const closeForm = () => {
    props.closeEvent(false);
  };
  const showListHandler = () => {
    setShowList((prev) => (prev = !prev));
    setSideBar((prev) => (prev = !prev));
  };

  const eventTitleHandler = (e) => {
    setEventTitle(e.target.value);
  };
  const editStartHandler = (e) => {
    setStart(e.target.value);
  };

  const editEndHandler = (e) => {
    setEnd(e.target.value);
  };
  const cancelEditHandler = () => {
    setEditable(false);
  };

  const saveTextHandler = () => {
    axios.put(
      `http://localhost:8081/modifierEvenementTitre/${props.idSeance}/${eventTitle}`
    );
    axios.put(
      `http://localhost:8081/modifierEvenementDebut/${props.idSeance}/${start}`
    );
    axios.put(
      `http://localhost:8081/modifierEvenementFin/${props.idSeance}/${end}`
    );
    setEditable(false);
  };

  const editTextHandler = () => {
    setEditable(true);
  };

  return (
    <>
      {newEvent && (
        <>
          <div className="EventModal">
            {!editable ? (
              <>
                <div className="modalInput">
                  <label>Titre : </label>
                  <span style={{ marginTop: "5px" }}>
                    &nbsp;{newEvent?.title || ""}
                  </span>
                </div>
                <div className="modalInput">
                  <label>Start: </label>
                  <input
                    type="datetime-local"
                    readOnly
                    value={newEvent?.start?.substring(0, 16) || ""}
                    style={{ padding: "4px", border: "none" }}
                  />
                </div>
                <div className="modalInput">
                  <label>End:</label>
                  <input
                    type="datetime-local"
                    readOnly
                    value={newEvent?.end?.substring(0, 16) || ""}
                    style={{ padding: "4px", border: "none" }}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", width: "100%", height: "34%" }}>
                  <label style={{ marginLeft: "10px", marginTop: "42px" }}>
                    Titre:
                  </label>
                  <textarea
                    className="titleTextArea"
                    contentEditable={editable}
                    suppressContentEditableWarning={true}
                    defaultValue={newEvent?.title}
                    onChange={eventTitleHandler}
                  />
                </div>
                <div className="event_modal_editable_input">
                  <label style={{ fontSize: "12px", marginLeft: "10px" }}>
                    Date Début:
                  </label>
                  <input
                    className="Event_input"
                    type="datetime-local"
                    value={newEvent?.start?.substring(0, 16)}
                    style={{ border: "none" }}
                    onChange={editStartHandler}
                  />
                </div>
                <div className="event_modal_editable_input">
                  <label style={{ fontSize: "12px", marginLeft: "10px" }}>
                    Date Fin:
                  </label>

                  <input
                    className="Event_input"
                    type="datetime-local"
                    value={newEvent?.end?.substring(0, 16)}
                    onChange={editEndHandler}
                  />
                </div>
              </>
            )}

            <div className="event_participant_field">
              <label>Participants</label>
              <motion.div
                animate={showList ? { rotateZ: 180 } : { rotateZ: 90 }}
              >
                <IconButton
                  style={{ border: "1px solid lightblue", padding: "2px" }}
                  onClick={showListHandler}
                >
                  <img src={Arrow} alt="c" />
                </IconButton>
              </motion.div>
            </div>
            <div className="event_modal_bottom">
              {!editable ? (
                <div className="event_modal_bottom_noneditable">
                  <label> Modifier</label>
                  <IconButton
                    style={{
                      border: "1px solid lightgray",
                      padding: "3px",
                      margin: "5px",
                    }}
                    onClick={editTextHandler}
                  >
                    <CreateIcon />
                  </IconButton>
                  <label> Supprimer</label>
                  <IconButton
                    style={{
                      border: "1px solid lightgray",
                      padding: "3px",
                      margin: "5px",
                    }}
                    onClick={deleteEventHandler}
                  >
                    <img src={deleteUserData} height="25px" alt="removeEvent" />
                  </IconButton>
                </div>
              ) : (
                <div className="event_modal_operations">
                  <div>
                    <label> Sauvegarder</label>
                    <IconButton
                      style={{
                        border: "1px solid lightblue",
                        padding: "2px",
                        margin: "5px",
                      }}
                      onClick={saveTextHandler}
                    >
                      <img
                        style={{ height: "32px" }}
                        src={save}
                        alt="confirmchange"
                      />
                    </IconButton>
                  </div>

                  <div>
                    <label> Annuler</label>
                    <IconButton
                      style={{
                        border: "1px solid lightblue",
                        padding: "2px",
                        margin: "5px",
                      }}
                      onClick={cancelEditHandler}
                    >
                      <img
                        src={cancel}
                        style={{ height: "32px" }}
                        alt="cancelEditing"
                      />
                    </IconButton>
                  </div>
                </div>
              )}
              <IconButton
                onClick={closeForm}
                style={{
                  position: "absolute",
                  top: "0",
                  right: "4px",
                  margin: "2px",
                  padding: "7px",
                  border: "1px solid lightgray",
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <SideBarModal
              idSeance={props.idSeance}
              sideBar={sideBar}
              setValue={setSideBar}
            />
          </div>
        </>
      )}
    </>
  );
};

export default EventModal;
