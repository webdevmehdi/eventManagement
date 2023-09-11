import axios from "axios";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MotionBackdrop from "../../../UI/Backdrop/MotionBackdrop";
import "./CategoryForm.css";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import defaultCategoriePhoto from "../../../../Assets/images/defaultCategoriePhoto.jpg";
import folder from "../../../../Assets/images/folder.png";
import pickImage from "../../../../Assets/images/pickImage.png";
import Alert from "@material-ui/lab/Alert";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
//import { addCategory } from "../../../../Redux-Actions/LibraryActions/LibraryActions";
import { alertActions } from "../../../../Redux-Actions/Alert-Actions/AlertActions";
import { addCategory } from "../../../../features/librarySlice";
const CategoryForm = (props) => {
  let dispatch = useDispatch();
  let categorieObject = {
    nom: "",
    imageCategorie: null,
  };
  const [categorieImage, setCategoryImage] = useState();
  const [categorieName, setCategoryName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUploader, setImageUploader] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [categorie, setCategorie] = useState(categorieObject);
  const [submit, setSubmit] = useState(false);

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
    setCategoryImage(null);
    setCategoryName("");
    setPreviewImage(null);
    setImageLoaded(false);
    setImageUploader(false);
    setSubmit(false);

    dispatch(alertActions.clear());
  };

  const imageSelectedHandler = (e) => {
    setCategoryImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setImageLoaded(true);
  };

  const handleCategoryFormSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

    let formData = new FormData();
    formData.append("image", categorieImage);
    let categorieObject = {
      nom: categorieName,
      categoryImage: formData,
    };
    dispatch(addCategory(categorieObject));
    //resetForm();
  };
  return (
    <MotionBackdrop onClick={props.handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: 100,
        }}
        //  transition={{ duration: 1 }}
      >
        <form className="categoryForm" onSubmit={handleCategoryFormSubmit}>
          <label className="labelCategorie">Formulaire Catégorie</label>
          <div className="categoryForm_categorieNom">
            <label style={{ alignSelf: "center" }}>Catégorie :</label>
            <input
              value={categorieName}
              style={{ margin: "5px", height: "40px" }}
              type="text"
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label> Choisissez une Image (*) :&nbsp; </label>
            <>
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
                style={{ display: "none" }}
                ref={fileInput}
                type="file"
                onChange={imageSelectedHandler}
              />
            </>
            {imageLoaded && (
              <img
                style={{
                  height: "50%",
                  width: "50%",
                  padding: "10px",
                  objectFit: "contain",
                }}
                src={previewImage}
              />
            )}
          </div>
          <p style={{ fontSize: "0.65rem" }}>
            (*): Si aucune imagine n'était pas selectionnée alors une sera
            atttribuée
          </p>
          <button type="submit" className="btn btn-primary">
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
export default connect(mapStateToProps)(CategoryForm);

/* 
<form className="categoryForm" onSubmit={handleCategoryFormSubmit}>
<label className="labelCategorie">Formulaire Catégorie</label>
<div>
  {props.message && (
    <div className="form-group">
      <div className="alert alert-danger" role="alert">
        {props.message}
      </div>
    </div>
  )}{" "}
  <label>Catégorie :</label>
  <div>
    <input
      value={categorieName}
      style={{ margin: "5px", height: "40px" }}
      type="text"
      onChange={(e) => {
        setCategoryName(e.target.value);
      }}
    />
    {submit && !categorieName && (
      <Alert variant="outlined" severity="error">
        Veuillez introduire nom de catégorie
      </Alert>
    )}
  </div>
</div>

{imageUploader ? (
  <div className="imageUploader">
    {!imageLoaded && (
      <>
        <label>Upload image</label>
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
          style={{ display: "none" }}
          ref={fileInput}
          type="file"
          onChange={imageSelectedHandler}
        />
      </>
    )}
    {imageLoaded && (
      <img
        style={{
          height: "50%",
          width: "50%",
          padding: "10px",
          objectFit: "contain",
        }}
        src={previewImage}
      />
    )}
  </div>
) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <label> Choisissez une Image (*) :&nbsp; </label>
      <IconButton
        style={{ border: "1px solid orange" }}
        onClick={setImageUploaderHandler}
      >
        <img
          src={pickImage}
          style={{ height: "50px", objectFit: "contain" }}
          alt="folderImage"
        />
      </IconButton>
    </div>
)}

<button type="submit" className="btn btn-primary">
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
<span style={{ margin: "10px" }}>
  * : si aucune image n'a pas été choisie alors une sera attribuée par
  défault
</span>
</form> */
