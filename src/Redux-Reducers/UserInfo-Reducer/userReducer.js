import { hashById } from "../../Utils/utils";
//let user = JSON.parse(localStorage.getItem("user"));
let userObj = {
  nom: "",
  prenom: "",
  email: "",
  password: "",
  role: {id:"", name: "" },
};
export const userInfo = (state = userObj, action) => {
  switch (
    action.type /* password : action.payload.password, email : action.payload.email} */
  ) {
    case "UPDATE_USERINFO":
      return {
        ...state,
        [action.user.id]: action.user,
      };

    default:
      return state;
  }
};
export const selectUser = (state) => state.users; //this is an example of selectors to help you
/// extract state's value , this method uses react hooks (useSelector) to be called in the componenent/// the alternative in class based componenents is mapStateToprops
