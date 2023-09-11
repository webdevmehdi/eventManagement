import {
  requestListUserEncandre,
  requestAddEnseignant,
  requestAddEtudiant,
  requestFichePfe,
} from "../../Middleware/UserInfo-Middleware/requests-UserInfo";
import { history, login, logout } from "../../Utils/utils";
import { alertActions } from "../Alert-Actions/AlertActions";
import { useHistory } from "react-router";
const userActions = {
  requestListUsers,
  updateUser,
  requestRegisterEtudiant,
  requestRegisterEnseignant,
  requestLogOut,
};
export const requestLogin = (email, password) => {
  return (dispatch) => {
    return login(email, password)
      .then((user) => {
        dispatch({
          type: "USERS_LOGIN_SUCCESS",
          username: response.data.username,
          accessToken: response.data.access_token,
        });
      })
      .then(
        dispatch({
          type: "ALERT_SUCCESS",
          payload: "User logged in successfully",
        })
      )
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

function requestListUsers(nomEnseignant) {
  return (dispatch) => {
    return requestListUserEncandre(nomEnseignant).then(
      (ListEtudiantEncadre) => {
        dispatch({
          type: "RECEIVE_USER_ENCADRE",
          payload: ListEtudiantEncadre,
        });
      }
    );
  };
}

export function requestLogOut() {
  return (dispatch) => {
    dispatch({ type: "USERS_LOGOUT" });
    logout();
  };
}
export function requestRegisterEtudiant(userInfo) {
  return (dispatch) => {
    return requestAddEtudiant(userInfo)
      .then((response) => {
        console.log(response);
        dispatch({ type: "REGISTER_SUCCESS" });
        dispatch(alertActions.success("User has been added successfully"));
      })
      .catch((error) => {
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
          /*  dispatch({ type: "REGISTER_FAILURE" }); */
        } else if (error.request) {
          let message = error.message;
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          dispatch({ type: "ALERT_ERROR", payload: message });
          dispatch({ type: "REGISTER_FAILURE" });
          console.log(error.message);
        }
      });
  };
}
export function requestRegisterEnseignant(userInfo) {
  return (dispatch) => {
    return requestAddEnseignant(userInfo)
      .then((response) => {
        console.log(response);
        dispatch(alertActions.success("User has been added successfully"));
        dispatch({ type: "REGISTER_SUCCESS" });
      })
      .catch((error) => {
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
          /*  dispatch({ type: "REGISTER_FAILURE" }); */
        } else if (error.request) {
          let message = error.message;
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          dispatch({ type: "ALERT_ERROR", payload: message });
          dispatch({ type: "REGISTER_FAILURE" });
          console.log(error.message);
        }
      });
  };
}
function updateUser(userInfo) {
  return (dispatch) => {
    return requestUserInfoUpdate(userInfo)
      .then(() => {
        dispatch({
          type: "UPDATE_USER",
          plainEventObject,
        });
      })
      .catch((error) => {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          const message = error.response.data.message;
          console.log(error.response.data.message);
          console.log(error.response.status);
          console.log(error.response.headers);
          dispatch(failure(message));
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
        }
      });
  };
}

export default userActions;
