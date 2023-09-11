import {
  ajouterCategorie,
  ajouterLivre,
} from "../../Middleware/Library-Middleware-thunk/Category-Middleware-thunk";
import { history, login, logout } from "../../Utils/utils";
import { alertActions } from "../Alert-Actions/AlertActions";
import Swal from "sweetalert2";

const LibraryActions = {
  addCategory,
  addBook,
};
export const addCategory = (categorieName, formData) => {
  return (dispatch) => {
    return ajouterCategorie(categorieName, formData)
      .then((response) => {
        console.log(response.data);
        Swal.fire("Catégorie Ajoutée", "", "success");
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          const message = error.response.data.message;
          console.log(error.response.data.message);
          console.log(error.response.status);
          console.log(error.response.headers);
          dispatch({ type: "ALERT_ERROR", payload: message });
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          let message = error.message;
          dispatch({ type: "ALERT_ERROR", payload: message });

          // dispatch(alertActions.error(message + " please try again"));

          console.log(error.request);
        }
      });
  };
};
//categoryName,
export const addBook = (formData, userId,categorieName) => {
  return (dispatch) => {
    return ajouterLivre(formData, userId,categorieName)
      .then((response) => {
        //   response
        Swal.fire("Catégorie Ajoutée", "", "success");
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          const message = error.response.data.message;
          console.log(error.response.data.message);
          console.log(error.response.status);
          console.log(error.response.headers);
          dispatch({ type: "ALERT_ERROR", payload: message });
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          let message = error.message;
          dispatch({ type: "ALERT_ERROR", payload: message });

          // dispatch(alertActions.error(message + " please try again"));

        }
      });
  };
};

export default LibraryActions;
