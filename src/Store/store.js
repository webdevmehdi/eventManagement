import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../features/eventSlice";
import alertReducer from "../features/alertSlice";
import libraryReducer from "../features/librarySlice";
import evenementReducer from "../features/evenementSlice";
import { authentication } from "../Redux-Reducers/Authentication/AuthenticationReducer";
import { combineReducers,  } from "redux";

const appReducer = combineReducers({
  authentication,
  alert: alertReducer,
  events: eventsReducer,
  library: libraryReducer,
  evenement : evenementReducer,
});
const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "USERS_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
