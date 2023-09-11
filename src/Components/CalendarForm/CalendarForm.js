import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import "./CalendarForm.css";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import { alertActions } from "../../Redux-Actions/Alert-Actions/AlertActions";
import { motion } from "framer-motion";
import arrow from "../../Assets/images/Rightarrow.svg";
import TimePicker from "../../Hooks/timePicker";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import { TextField, Stack } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { creerEvenement } from "../../features/evenementSlice";
import { useSelector } from "react-redux";
import remove2 from "../../Assets/images/remove2.svg";
import { clear, failure } from "../../features/alertSlice";
const CalendarForm = (props) => {
  let myFormRef = React.createRef();
  let eventGuid = 1;
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const alertMessage = useSelector((state) => state.alert.message);
  function createEventId() {
    return String(eventGuid++);
  }
  /* const iconListVariants = {
    opened: {
      scale: 3,
    },
    closed: {
      scale: 0,
    },
  }; */
  let eventObj = {
    title: "",
    date: "",
    start: "",
    end: "",
    etudiant: { email: "" },
    //url: "",
    overlap: false,
  };
  const [eventForm, setEventForm] = useState(eventObj); //  should be uncommented ( testing for the reset button )
  const [titre, setTitre] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(null);
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [displayList, setDisplayList] = useState(false);
  const [listparticipants, setListParticipants] = useState([]);
  const [errorStartDate, setErrorStartDate] = useState(false);
  const [errorEndDate, setErrorEndDate] = useState(false);

  const [currentEndDateError, setCurrentEndDateError] = useState(null);
  const [currentStartDateError, setCurrentStartDateError] = useState(null);

  const [participant, setParticipant] = useState({
    partcipantemail: "",
    partcipantname: "",
  });

  const resetForm = () => {
    setTitre("");
    setStart(new Date());
    setEnd(null);
    setEmail("");
    setSubmit(false);
    //testing setDispalyList
    setDisplayList(false);
    setListParticipants([]);
    dispatch(clear());
  };
  let ListParticipants = [
    { name: "M", emailAdress: "l@l" },
    { name: "E", emailAdress: "h@h" },
  ];
  const handleDispalyList = () => {
    setDisplayList((prev) => (prev = !prev));
  };
  const handleTitre = (e) => {
    let value = e.target.value;
    let titleCopy = { ...title };
    titleCopy = value;
    setTitre(titleCopy);
  };
  const handleStart = (newValue) => {
    // let {value} = e.target.value;
    /*  if (newValue === undefined || newValue === null) {
      handleErrorDate(true);
    } else { */
    console.log(Object.keys(newValue));
    if (newValue === "Invalid Date") {
      console.log(newValue);
    }
    setStart(newValue);
    /* } */
  };
  const handleEnd = (newValue) => {
    let endDate = new Date(newValue).toISOString().substring(0, 16);
    setEnd(endDate);
  };

  const handleEmail = (e) => {
    //  let value = e.target.value;
    setEmail(e.target.value);
  };

  const handleParticipant = (e) => {
    const participantValue = e.target.value;

    setParticipant((prev) => {
      return {
        ...prev,
        partcipantemail: participantValue,
      };
    });
  };
  const handleParticipantSubmit = (event) => {
    event.preventDefault();
    let newParticipant = {
      email: participant?.partcipantemail,
      name: participant?.partcipantname,
    };
    let newParticipantList = [...listparticipants, newParticipant];
    let newS = [...new Set(newParticipantList)];
    setListParticipants(newS);
  };

  const closeForm = () => {
    props.formHandler(false);
    resetForm();
  };

  const onClickHandler = (e) => {
    if (props.loaded && submit) {
      resetForm();
    }
  };
  const handleErrorDate = (reason, value) => {
    /* reason:   The reason why the current value is not valid.
      value :The invalid value. */
    console.log("reason " + reason, "value " + value, " " + start);
    if (value != currentError) {
      if (value === "Invalid Date") {
        setErrorDate(true);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let eventObj = {
      title: titre,
      start: start,
      end: end,
      participants: listparticipants,
    };

    if (
      start &&
      end &&
      !currentStartDateError &&
      !currentEndDateError &&
      !currentStartDateError
    ) {
      console.log(end);
      setSubmit(true);
      dispatch(creerEvenement(eventObj));
    } else {
      dispatch(failure("Veuillez Vérifier Vos Données"));
    }
    /*  if (end && start && titre && submit) {
      dispatch(creerEvenement(eventObj));
    } */
    /*   if (start && end && titre) {
      setTitre("");
      setStart("");
      setEnd("");
      setEmail("");
      setSubmit(false);
      //testing setDispalyList
      setDisplayList(false);
      setListParticipants([]);
      dispatch(clear());
    } */
    // setEventForm(eventObj);
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {alertMessage && (
          <Alert
            style={{ margin: "10px" }}
            variant="outlined"
            severity="warning"
          >
            {alertMessage}
          </Alert>
        )}
        <TextField
          style={{ margin: "auto", width: "80%" }}
          required
          label="Titre"
          type="text"
          value={titre}
          onChange={(e) => handleTitre(e)}
        />

        {!titre && submit && (
          <Alert variant="outlined" severity="error">
            Veuillez introduire un titre
          </Alert>
        )}

        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <DateTimePicker
                label="Date de Début de Séance"
                value={start}
                onChange={(newValue) => {
                  setStart(newValue);
                }}
               inputFormat="dd/mm/yyyy hh:mm "
                minDate={new Date()}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    error={errorStartDate}
                    helperText={currentStartDateError ?? currentStartDateError}
                  />
                )}
                onError={(reason, value) => {
                  if (reason) {
                    setCurrentStartDateError(reason);
                    setErrorStartDate(true);
                  } else {
                    setCurrentStartDateError(null);
                    setErrorStartDate(false);
                  }
                }}
               disableCloseOnSelect={true}
              />
              {!start && submit && (
                <Alert variant="outlined" severity="error">
                  Veuillez introduire une date
                </Alert>
              )}
              <DateTimePicker
                value={end}
                label="Date de Fin de Séance"
                onChange={(newValue) => {
                  console.log(newValue);
                  setEnd(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    id="outlined-basic"
                    variant="outlined"
                    {...params}
                    error={errorEndDate}
                    helperText={currentEndDateError ?? currentEndDateError}
                  />
                )}
                onError={(reason, value) => {
                  if (reason) {
                    setCurrentEndDateError(reason);
                    setErrorEndDate(true);
                  } else {
                    setCurrentEndDateError(null);
                    setErrorEndDate(false);
                  }
                }}
              />
              {!end && submit && (
                <Alert variant="outlined" severity="error">
                  Veuillez introduire une date
                </Alert>
              )}
            </Stack>
          </LocalizationProvider>
        </div>

        <div className="participantsContainer">
          <span>participants</span>

          <motion.div
            onClick={() => setDisplayList(!displayList)}
            animate={{
              rotate: displayList ? 90 : 180,
            }}
          >
            <img
              style={{
                border: "1px solid black",
                borderRadius: "15px",
                height: "28px",
                width: "30px",
                padding: "5px",
                margin: "2px",
              }}
              src={arrow}
              alt="arrow"
            />
          </motion.div>
        </div>
        {displayList && (
          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "190px",
            }}
          >
            <div
              style={{
                width: "90%",
                height: "43%",
                overFlow: "auto",
                margin: "5px",
                overflowY: "auto",
                border: "1px solid",
              }}
            >
              <table style={{ width: "100%" }}>
                <thead>
                  <tr
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <th
                      style={{
                        backgroundColor: " rgb(117, 201, 250",
                      }}
                    >
                      <label>Email</label>
                    </th>
                    <th
                      style={{
                        backgroundColor: " rgb(117, 201, 250",
                      }}
                    >
                      <label>Operation</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listparticipants.length != 0 &&
                    listparticipants.map((user, index) => (
                      <tr style={{ borderBottom: "1px solid" }} key={index}>
                        <td style={{ width: "70%" }}>
                          <span> {user.email}</span>
                        </td>
                        <td style={{ width: "30%" }}>
                          <IconButton>
                            <img height="25px" src={remove2} alt="delete" />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ fontSize: "10px" }}>
                Ajouter Email participant
              </label>
              <input
                className="input_field"
                type="text"
                value={participant.email}
                onChange={handleParticipant}
              />
              <button
                className="btn btn-primary"
                onClick={handleParticipantSubmit}
              >
                Add
              </button>
            </div>
          </motion.div>
        )}

        <div className="calendarFormButtons">
          <button type="submit" className="btn btn-primary">
            save
          </button>
          <button className="btn btn-primary" onClick={resetForm} type="button">
            Cancel
          </button>
        </div>
        <IconButton
          onClick={closeForm}
          style={{ position: "absolute", top: "0", right: "0" }}
        >
          <CloseIcon />
        </IconButton>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  const { message } = state.alert;
  const { loaded } = state.alert;
  const { username } = state.authentication;
  const eventsById = state.eventsById;
  return {
    message: message,
    loaded: loaded,
    username: username,
    eventsById: eventsById,
  };
};
export default connect(mapStateToProps)(CalendarForm);
{
  /* 
import React from "react";

export const NewNoteInput = ({ addNote }) => {
  const [note, setNote] = React.useState("");

  const updateNote = (event) => {
    setNote(event.target.value);
  };

  const onAddNoteClick = () => {
    addNote(note);
    setNote("");
  };

  return (
    <div>
      <input
        onChange={updateNote}
        value={note}
        type="text"
        name="note"
        placeholder="Note"
      />
      <button onClick={onAddNoteClick}>Add note</button>
    </div>
  );
}; 
 <div className="submit">
          <button
            type="submit"
            className="button"
          >
            save
          </button>
          <button className="button" onClick={resetForm} type="button">
            Cancel
          </button>
        </div>  */
}
