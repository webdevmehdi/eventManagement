import React, { useEffect, useState } from "react";
import Member from "./Member/Member";
import "./MemberList.css";
import "./Member/Member.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import DescriptionIcon from "@material-ui/icons/Description";

const Members = (props) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [listEtudiantsEncadres, setListEtudaintsEncadres] = useState([]);
  /*   let data = Array.from(users);*/
  let members = [
    {
      email: "mehdiazizikef@gmail.com",
      fichepfe: "creation d'un site web pour agence de voyage",
    },
    {
      email: "brahimazizi@gmail.com",
      fichepfe:
        "creation d'un site web pour agence de voyage sur une platform multi-cross et integration ci/cd",
    },
  ];
  const email = useSelector((state) => state.authentication.username);
  useEffect(() => {
    let isMounted = true;
    const getListEtudiantEncadre = async () => {
      try {
        const response = await axiosPrivate
          .get(`getListEtudiantEncadre/${email}`)
          .then((response) => response.data);

        //let listEtudiant = [...listEtudiantsEncadres];
        // let newList = listEtudiant.concat(response);
        /*   setListEtudaintsEncadres(
            (prev)=>{
              let listEtudiant = [...prev];
             response.map(item => listEtudiant.push(item))
             return listEtudiant;
            }
          ); */
        setListEtudaintsEncadres(response);
      } catch (error) {
        console.log(error);
      }
    };
    isMounted && getListEtudiantEncadre();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="list_layout">
      <div className="card">
        <div className="card{}-header">Liste des Etudiants Encadrés</div>
        <div className="table-responsive ">
          <table className="table">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>
                  <MailOutlineIcon />
                  <strong>Email</strong>
                </th>
                <th>
                  <DescriptionIcon />
                  <strong>Project Name</strong>
                </th>
                <th>
                  <strong>Operations</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {members?.map((user, index) => (
                <Member
                  key={index}
                  // picture={f1}
                  email={user.email}
                  titre={user.fichepfe}
                  /* titre={user.fichepfe.sujet} */
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Members;
