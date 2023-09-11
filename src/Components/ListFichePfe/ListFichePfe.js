import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CardFichePfe from "../../Components/ListFichePfe/CardFichePfe/CardFichePfe";
import "./ListFichePfe.css";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
const ListFichePfe = (props) => {
  const email = useSelector((state) => state.authentication.username);
  const axiosPrivate = useAxiosPrivate();
  const [fichesPfe, setFichesPfe] = useState([]);
  const [itemNumber, setItemNumber] = useState(1);
  const [activeClass, setActiveClass] = useState(false);
  let items = [
    { id: 1, description: "first number" },
    { id: 2, description: "second number" },
    { id: 3, description: "third number" },
    { id: 4, description: "fourth number" },
  ];
  const showItemsHandler = () => {
    console.log(props.user.fichepfe);
    setItemNumber((itemNumber) => (itemNumber += 1));
    setActiveClass(!activeClass);

    /*  */
  };
  const hideItemsHandler = () => {
    setItemNumber(1);
  };

  const toggleButtonClass = () => {}; /*
  useEffect(() => {
     try {
      axiosPrivate
        .get(`http://localhost:8081/getListFichePfeparEnseignant/${email}`)
        .then((response) => {
          setFichesPfe(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []); */
  return (
    <div style={{ margin: "10px", padding: "10px" }}>
      <h4>Liste de Projets fin d'études</h4>
      <div className="listFichePfe">
        {items.map(
          (
            e /// map to be replace with slice to get limited of items per call !! we are create a shallow copy here !!
            // it means that when we modify the shallow copy the original array is modified too
          ) => (
            <NavLink
              key={e.id}
              style={{ textDecoration: "none" }}
              to={{
                pathname: `/home/teacher/fichepfe/${e.id}`,
              }}
            >
              <CardFichePfe idpfe={e.id} pfedescription={e.description} />
            </NavLink>
          )
        )}
      </div>
    </div>
  );
};

export default ListFichePfe;

/* {
  items.slice(0, itemNumber).map((e) => (
    <div key={e.id}>
      {" "}
      <FichePfe key={e.id} idpfe={e.id} pfedescription={e.description} />
    </div>
  )) 

} */
