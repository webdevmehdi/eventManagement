import axios from "axios";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MotionBackdrop from "../../UI/Backdrop/MotionBackdrop";
import "../Category/CategoryForm/CategoryForm.css";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import defaultCategoriePhoto from "../../../Assets/images/defaultCategoriePhoto.jpg";
import folder from "../../../Assets/images/folder.png";
import pickImage from "../../../Assets/images/pickImage.png";
import Alert from "@material-ui/lab/Alert";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { addBook } from "../../../Redux-Actions/LibraryActions/LibraryActions";
import { alertActions } from "../../../Redux-Actions/Alert-Actions/AlertActions";
import "./BookForm.css";
const BookForm = (props) => {
  
  let dispatch = useDispatch();
  let categorieObject = {
    nom: "",
    imageCategorie: null,
  };
  const [livreFile, setLivreFile] = useState();
  const [livreName, setLivreName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUploader, setImageUploader] = useState(false);
  const [livre, setLivre] = useState(categorieObject);
  const [submit, setSubmit] = useState(false);
  const [uploadedPercentage, setUploadedPercentage] = useState(0);
  const fileInput = React.useRef();
  const dropIn = {
    hidden: {
      y: "-100vh",
    },
    visible: {
      y: "-80vh",
      opacity: "1",
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stifness: 500,
      },
    },
    exit: {
      y: "100vh",
    },
  };
  const setImageUploaderHandler = () => {
    setImageUploader(true);
  };

  const resetForm = () => {
    setLivreFile(null);
    setLivreName("");
    setPreviewImage(null);
    setImageUploader(false);
    setSubmit(false);

    dispatch(alertActions.clear());
  };

  const imageSelectedHandler = (e) => {
    setLivreFile((prev)=> prev = e.target.files[0]);
    /* const options = {
      onuploadProgress: () => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setUploadedPercentage(percent);
        }
      },
    };
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result);
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]); */
  };

  const handleCategoryFormSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", livreFile);
    dispatch(addBook(formData,props.user.id,props.categorieName));//,props.nomCategorie
    /* let newblobpdf = new Blob([response.data], { type: "application/pdf" });
    convertBase64(newblobpdf).then((response) => {
      console.log(response.split(",")[1]);
      let newBlob = response.split(",")[1];
      setFile(newBlob);
    }); */
    /* if(categorieImage === null){
      setCategoryImage(defaultCategoriePhoto)
    } */

    setSubmit(true);
    resetForm();
    dispatch(alertActions.clear());
  };
  return (
    <MotionBackdrop onClick={props.handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        /*  variant={dropIn} */
        initial={{
          y: "-100vh",
        }}
        animate={{
          y: "0",
        }}
        exit={{
          y: "100vh",
        }}
      >
        {/* {props.message &&
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: props.message,
          })} */}
        <form className="BookForm" onSubmit={handleCategoryFormSubmit}>
          <label className="labelCategorie">Formulaire Livre</label>
          <div>
            {props.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {props.message}
                </div>
              </div>
            )}
          </div>
          <div className="imageUploader">
            <>
              <label>Upload File</label>
              <IconButton
                style={{ border: "1px solid orange" }}
                onClick={() => {
                  fileInput.current.click();
                }}
              >
                <img
                  src={folder}
                  style={{ height: "50px", objectFit: "contain" }}
                  alt="folderImage"
                />
              </IconButton>

              <input
                ref={fileInput}
                accept="application/pdf,application/vnd.ms-excel"
                style={{ display: "none" }}
                type="file"
                onChange={imageSelectedHandler}
              />
            </>
          </div>

          <button
            style={{ margin: "3px" }}
            type="submit"
            className="btn btn-primary"
          >
            Enregister
          </button>
          <IconButton
            onClick={props.handleClose}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              border: "1px solid gray",
              borderRadius: "25px",
              margin: "5px",
            }}
          >
            <CloseIcon />
          </IconButton>
        </form>
      </motion.div>
    </MotionBackdrop>
  );
};

const mapStateToProps = (state) => {
  const { message } = state.alert;
  const { user } = state.authentication;
  return {
    message: message,
    user: user,
  };
};
export default withRouter(connect(mapStateToProps)(BookForm));
