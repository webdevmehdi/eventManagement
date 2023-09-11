import React, { useEffect, useState } from "react";
import "./Librairie.css";
import librarybackground from "../../Assets/images/librarybackground.jpg";
import { filter } from "lodash";
import { Route, Switch, withRouter } from "react-router";
import Category from "./Category/Category";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import CardCategory from "../Librairie/Category/CardCategory/CardCategory";
import literature from "../../Assets/images/literature.jpg";
import CategoryForm from "./Category/CategoryForm/CategoryForm";
import { AnimatePresence } from "framer-motion";
import { connect, useSelector } from "react-redux";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const Librairie = (props) => {
  const [categories, setCategories] = useState([]);
  const [imageModfication, setImageModfication] = useState(false);
  const [imageCategorie, setImageCategorie] = useState();
  const [categorie, setCategorie] = useState();
  const [displayCategory, setDisplayCategory] = useState(false);
  const [deleteCategorieSelected, setDeleteCategorieSelected] = useState(false);
  const listcategories = useSelector((state) => state.library.categories);
  const axiosPrivate = useAxiosPrivate();
  const handleCategoryFormDispaly = () => {
    setDisplayCategory(true);
  };
  const handleCloseForm = () => {
    setDisplayCategory(false);
  };
  const uploadImageHandler = () => {
    setImageModfication(true);
  };

  const uploadImageCategorieHandler = () => {
    console.log(imageCategorie);
    axiosPrivate
      .post(
        "http://localhost:8081/uploadImageCategorie",

        imageCategorie
      )
      .then((response) => console.log(response));
  };
  useEffect(() => {
    axiosPrivate
      .get("http://localhost:8081/getCategories")
      .then((response) => setCategories(response.data));
  }, [displayCategory]);

  return (
    <>
      <Outlet />
      <h1
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
        <div style={{ margin: "30px" }} className="titleLibrary">
          <span>Welcome to the Library</span>
        </div>
      </h1>
      <div
        style={{
          display: "flex",
          margin: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontFamily: "Dancing Script",
            fontSize: "xx-large",
            margin: "10px",
          }}
        >
          {" "}
          Categories :{" "}
        </label>
        <button className="button-30" onClick={handleCategoryFormDispaly}>
          Ajouter Categorie
        </button>
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {displayCategory && (
            <CategoryForm
              handleOpenForm={handleCategoryFormDispaly}
              handleClose={handleCloseForm}
            />
          )}
        </AnimatePresence>
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            style={{ display: "flex", flexDirection: "column", margin: "5px" }}
          >
            <NavLink
              key={index}
              to={{ pathname: `/library/${category.nom}` }}
              style={{ textDecoration: "none" }}
            >
              <CardCategory nomCategorie={category.nom} />
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  const { message } = state.alert;
  const { loaded } = state.alert;

  return { message: message, loaded: loaded };
};

export default connect(mapStateToProps)(Librairie);
