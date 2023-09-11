import React, { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router";
import CardLivre from "../Books/CardLivre/CardLivre";
import literature from "../../../Assets/images/literature.jpg";
import librarybackground from "../../../Assets/images/librarybackground.jpg";
import "./Category.css";
import axios from "axios";
import { pdfjs } from "react-pdf";
import { AnimatePresence } from "framer-motion";
import BookForm from "../Books/BookForm";
import { alertActions } from "../../../Redux-Actions/Alert-Actions/AlertActions";
import { useDispatch } from "react-redux";
import { deleteCategorie } from "../../../Middleware/Library-Middleware-thunk/Category-Middleware-thunk";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const Category = (props) => {
  const history = useHistory();
  const { categorie } = useParams();
  const dispatch = useDispatch();
  let listDesNoms = ["test", "test1", "t"];
  const [displayCategory, setDisplayCategory] = useState(false);

  const handleDeleteCategory = () => {
    deleteCategorie(categorie).then(response=>
      history.push("/home/library")
      );
  };
  const [listLivres, setListLivres] = useState([]);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  const uploadImage = () => {
    axios
      .post("http://localhost:8081/uploadImageLivre", file)
      .then((response) => {
        let newblobpdf = new Blob([response.data], { type: "application/pdf" });
        convertBase64(newblobpdf).then((response) => {
          console.log(response.split(",")[1]);
          let newBlob = response.split(",")[1];
          setFile(newBlob);
        });
      });
  };
  const handleCategoryFormDispaly = () => {
    setDisplayCategory(true);
  };
  const handleCloseForm = () => {
    setDisplayCategory(false);
    dispatch(alertActions.clear());
  };
  const lireHandler = () => {
    const fileR = new Blob([file], {
      type: "application/pdf",
    });
    let url = URL.createObjectURL(fileR);
    window.open(url);
  };
  useEffect(() => {
    /*    axios.get("http://localhost:8080/getImage",{
      responseType:"blob",
      ...options
    }).then((response) => {console.log(response)}) */
    //axios.get("http://localhost:8080/getImage").then(response => {console.log(response)})
    axios
      .get(`http://localhost:8081/getAllBooks/${categorie}`)
      .then((response) => {
        setListLivres(response.data);
        console.log(response.data);
      });
  }, [displayCategory]);

  return (
    <>
      <div
        style={{
          display: "flex",
          border: "1px solid lightgray",
          height: "120px",
          margin: "30px",
          justifyContent: "center",
          backgroundImage: `url(${librarybackground})`,
          objectFit: "contain",
        }}
      >
        <div
          style={{ margin: "30px", width: "260px" }}
          className="titleLibrary"
        >
          <span style={{ fontWeight: "bold", fontSize: "60px" }}>Livres</span>
        </div>
      </div>
      <div className="categoriesButtons">
        <label style={{fontFamily:"Dancing Script, cursive",fontSize:"xx-large",margin:"5px"}}>Opérations:</label>
        <button
        className="button-30"
         // style={{ margin: "10px", width: "50%",hover }}
         // className="btn btn-primary"
          onClick={handleCategoryFormDispaly}
        >
          Ajouter Livre
        </button>

        <button
          className="button-30"
          onClick={handleDeleteCategory}
        >
         Supprimer Categorie
        </button>
      </div>
      {/* <CardLivre  /> */}

      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {displayCategory && (
          <BookForm
            categorieName={categorie}
            handleOpenForm={handleCategoryFormDispaly}
            handleClose={handleCloseForm}
          />
        )}
      </AnimatePresence>
      <div className="listLivre">
        {listLivres.map((livre, index) => (
          <CardLivre key={index} fileId={livre.id} />
        ))}
      </div>
    </>
  );
};

export default Category;
