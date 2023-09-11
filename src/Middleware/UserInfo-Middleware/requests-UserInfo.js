import axios from "axios";
import { reject } from "lodash";
import { excludeById, getEvents, getTodayStr } from "../../Utils/utils";

/* let users = axios
  .get("http://localhost:8081/users")
  .then((response) => response.data.map((obj) => obj)); */
export function requestListUserEncandre(email) {
  console.log(`[STUB] requesting events from `);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let ListEtudiantEncadre = axios
        .get(`http://localhost:8081/getListEtudiantEncadre/${email}`)
        .then((response) => response.data);

      resolve(ListEtudiantEncadre);
    }, 10);
  });
}

export function requestAddEtudiant(userInfo) {
  console.log(userInfo);
  let response = axios.post("http://localhost:8081/signUp", userInfo);

  console.log(response);
  return response;
}
export function requestAddEnseignant(userInfo) {
  let response = axios.post(
    "http://localhost:8081/signUp",
    userInfo
  );

  /* .then((response) => response); */
  console.log(response);
  return response;
}

export function requestUserUpdate(userInfo) {
  console.log("[STUB] requesting event update:", "events");
  let response = axios.put(
    `http://localhost:8081/event/${userInfo.id}`,
    userInfo
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (response) {
        reject(new Error("problem"));
      } else {
        resolve(response);
      }
    }, 10);
  });
}

export function requestUserDelete(userId) {
  console.log("[STUB] requesting event delete, id:", userId);
  let response = `http://localhost:8081/event/${userId}`;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // simulate network delay
      if (response) {
        reject(new Error("problem"));
      } else {
        let userDb = [...eventDateBase, userInfo];
        userDb = excludeById(userDb, userId);
        resolve(userDb);
      }
    }, 10);
  });
}
