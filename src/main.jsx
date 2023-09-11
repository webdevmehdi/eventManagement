import React, { StrictMode } from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./Redux-Reducers/reducers";
import Home from "./Components/Home/Home";
import "./main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Container from "./Components/Container/Container";
import store from "./Store/store";
/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
); */

document.addEventListener("DOMContentLoaded", function () {
  render(
    <BrowserRouter>
      <StrictMode>
        <Provider store={store}>
          <Routes>
            <Route path="/*" element={<Container />} />
          </Routes>
        </Provider>
      </StrictMode>
    </BrowserRouter>,
    document.body.appendChild(document.createElement("div"))
  );
});
