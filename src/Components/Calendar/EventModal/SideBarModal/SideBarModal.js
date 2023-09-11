import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./SideBarModal.css";
import axios from "axios";
const SideBarModal = ({ sideBar = false, setValue = () => {}, idSeance }) => {
  const [participants, setParticipants] = useState([]);
  const [addParticipant, setAddParticipant] = useState(false);
  const [email, setEmail] = useState("");
  let listParticipants = [
    { name: "M", emailAdress: "l@l" },
    { name: "E", emailAdress: "h@h" },
  ];
 /*  useEffect(() => {
    axios
      .get(
        `http://localhost:8081/getListParticipantsBySeanceEncadrement/${idSeance}`
      )
      .then((response) => setParticipants(response.data));
  }, []); */
  const addParticipantHandler = (e) => {
    e.preventDefault();

    setAddParticipant((prev) => (prev = !prev));
  };
  const handleNouveauParticipant = () => {
    setAddParticipant(false);
  };
  return (
    <AnimatePresence>
      {sideBar && (
        
        <div
          /* 
        animate={{ opacity: 1, translateY: 0}}
        transition={{ type: "spring", stiffness: 120, duration: 0.4 }} */
          /*  initial={{ x: 0 }}
          animate={{
            opacity: 1,
            x: 2,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{ type: "spring", stiffness: 120, duration: 0.4 }} */
          className="SideBarModal"
        >
          <div className="table-responsive border" >
              <table className="table">
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th
                      style={{
                        backgroundColor: "rgb(117, 201, 250)",
                        border: "1px solid #ffffff",
                      }}
                    >
                      <strong>Email</strong>
                    </th>
                    <th
                      style={{
                        backgroundColor: "rgb(117, 201, 250)",
                        border: "1px solid #ffffff",
                      }}
                    >
                      <strong> Name</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listParticipants.length != 0 &&
                  
                  listParticipants.map((user, index) => (
                    <tr
                      key={index}
                      style={{ backgroundColor: "rgb(205, 235, 253)" }}
                    >
                      <td
                        style={{
                          backgroundColor: "rgb(205, 235, 253)",
                          border: "1px solid #ffffff",
                        }}
                      >
                        <span> {user.emailAdress}</span>
                      </td>
                      <td
                        style={{
                          backgroundColor: "rgb(205, 235, 253)",
                          border: "1px solid #ffffff",
                        }}
                      >
                        <span>{user.name}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
          {!addParticipant ? (
            <motion.div
              initial={{ x: 0 }}
              animate={{
                opacity: 1,
                x: 2,
              }}
              exit={{
                opacity: 0,
              }}
             /*  className="table-responsive border" */
             
            >
             {/*  <table className="table">
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>
                      <strong>Participants</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {participants.map((participant, index) => (
                      <td className="participant" key={index}>
                        {participant.email}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table> */}
              <button
                onClick={addParticipantHandler}
                className="btn btn-primary"
              >
                add participant
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ x: 0 }}
              animate={{
                opacity: 1,
                x: 2,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <form onSubmit={addParticipantHandler}>
                <div>
                  <label>
                    Veuillez introduire l'addresse email du nouveau participant
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setAddParticipant(false);
                  }}
                >
                  Cancel
                </button>
              </form>
              
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default SideBarModal;
