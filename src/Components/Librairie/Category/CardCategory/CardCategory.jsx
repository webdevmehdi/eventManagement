import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import "./CardCategory.css";
import useAxiosPrivate from "../../../../Hooks/useAxiosPrivate"
const CardCategory = (props) => {
  const [imageCategorie, setImageCategorie] = useState();
  const axiosPrivate = useAxiosPrivate();
  const imageCategorieHandler = () => {
    setImageModfication(true);
  };
  const categoryImage = useSelector((state) => {
    let category = state.library.categories.find(
      (category) => category.nom === props.nomCategorie
    );
  return category.categoryImage;
  });

  useEffect(() => {
    axiosPrivate
      .get(`http://localhost:8081/getImageCategorie/${props.nomCategorie}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        let imageBlob = new Blob([response.data]);
        let imageUrl = URL.createObjectURL(imageBlob);
        setImageCategorie(imageUrl);
      });
  }, []);

  return (
    <div className="cardCategoryContainer">
      <img
        style={{ height: "220px", width: "234px", objectFit: "contain" }}
        src={imageCategorie}
        alt="literature"
      />

      <div className="cardCategorybody">
        <label style={{ padding: "2px" }}>
          <strong>{props.nomCategorie}</strong>
        </label>
      </div>

      {/*  { Administrator : <div style={{ display: "flex" }}>
      <button style={{ margin: "2px" }} class="btn btn-primary">
        modifier
      </button>
      <button style={{ margin: "2px" }} class="" class="btn btn-primary">
        supprimer
      </button>
    </div>} */}
    </div>
  );
};

export default CardCategory;
