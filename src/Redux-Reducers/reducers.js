import { combineReducers } from "redux";
import { userInfo } from "./UserInfo-Reducer/userReducer";
import { authentication } from "./Authentication/AuthenticationReducer";
import { alert } from "./Alert/AlertReducer";
import { register } from "./Register/RegisterReducer";
const rootReducer = combineReducers({
 
  authentication,
});

export default rootReducer;
