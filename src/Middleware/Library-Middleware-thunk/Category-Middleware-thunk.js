import axios from "axios";
import Swal from "sweetalert2";
import { alertActions } from "../../Redux-Actions/Alert-Actions/AlertActions";
import { useDispatch } from "react-redux";

export function requestImageLivreModif(formData) {
  //  console.log(userInfo);
  let dispatch = useDispatch();
  let response = axios
    .post(`http://localhost:8081/uploadImageLivre`, formData)
    .then((response) => response.data);

  console.log(response.data);
}
export function requestImage() {
  let imageName = "math";
  let response = axios
    .get(`http://localhost:8081/getImage/${imageName}`) //.then(response=> response.data.picByte);

    .then((response) =>
      URL.createObjectURL(
        new Blob([response.data.picByte], { type: "application/pdf" })
      )
    );
  console.log(response);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 10);
  });
}
export function ajouterCategorie(categorieName, formData) {
  console.log(categorieName);
  let response = axios.post(
    `http://localhost:8081/ajouterCategorie/${categorieName}`,
    formData
  );
  return response;
}
export function ajouterLivre(formData, userId, categorieName) {
  console.log(categorieName);
  let response = axios.post(
    `http://localhost:8081/uploadImageLivre/${userId}/${categorieName}`,
    formData
  );

  return response;
}

export function deleteCategorie(nomCategorie) {
  //let response =
  return axios
    .delete(`http://localhost:8081/supprimerCategorie/${nomCategorie}`)
    .then((response) => {
      console.log(response.data);
      Swal.fire("Catégorie supprimée!", "Continuer", "success");
    });
}

export function deleteLivre(pdfId){
  console.log(pdfId);
let response =  axios
    .delete(`http://localhost:8081/supprimerLivre/${pdfId}`)
    .then((response) => {
       console.log(response.data);
      Swal.fire("Catégorie supprimée!", "Continuer", "success");
      response.data;
     
    });
    return response ;
}
