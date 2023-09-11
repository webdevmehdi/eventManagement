import "./Fichepfe.css";
/* import { useLocation, useParams } from "react-router"; */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Member from "../../MembersList/Member/Member";
import { connect } from "react-redux";
import FichePfeDetail from "./FichePfeDetail/FichePfeDetail";
import ListTaches from "../../ListFichePfe/FichePfe/TaskList/ListTaches";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

const FichePfe = (props) => {
  let items = [];
  const axiosPrivate = useAxiosPrivate();
  let fichepefObj = {
    id: "",
    sujet: "",
    description: "",
  };
  const { id } = useParams();
  //console.log(id);
  const [fichepfe, setFichePfe] = useState(fichepefObj);
  const [listEtudiants, setListEtudiants] = useState([]);
  const [listTaches, setListTaches] = useState([]);
  /*   const [editable, setEditable] = useState(false);
   */ /*   const isEditable = (edit) => {
    setEditable(true);
  }; */
  /* 
  console.log(location);
  console.log(id);
 */
  /*  useEffect(() => {
    axiosPrivate
      .get(`http://localhost:8081/getfichepfeById/${id}`)
      .then((response) => {
        fichepefObj = { ...fichepfe };
        fichepefObj = response.data;
        setFichePfe(fichepefObj);
      });

    axiosPrivate
      .get(`http://localhost:8081/getEtudiantsByFichepfeId/${id}`)
      .then((response) => {
        setListEtudiants(response.data);
      });

    axiosPrivate
      .get(`http://localhost:8081/getTasksByFichePfeId/${id}`)
      .then((response) => {
        setListTaches(response.data);
      });
  }, [
    id
  ]); */
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FichePfeDetail description={fichepfe.description} id={fichepfe.id} />
        <ListTaches listTaches={listTaches} />
      </div>
      {/* 
      <div className="card" style={{ width: "60%", margin: "10px" }}>
        <div
          className="card-header text-white"
          style={{ backgroundColor: "#3f51b5" }}
        >
          Liste des Etudiants
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>
                <strong>Member</strong>
              </th>
              <th>
                <strong>Email</strong>
              </th>
              <th>
                <strong>Project Name</strong>
              </th>
              <th>
                <strong>Operations</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {listEtudiants.map((user, index) => (
              <Member
                key={index}
                name={user.nom}
                prenom={user.prenom}
                email={user.email}
                titre={user.fichepfe.sujet}
              />
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  return { user: user };
};
export default connect(mapStateToProps)(FichePfe);
