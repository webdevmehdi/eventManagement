import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
//import { requestEventsInRange } from "../Middleware/Calendar-Middleware-thunk/requests";
import { useEffect, useState } from "react";
const useEventCalendar = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [state, setState] = useState();
    const requestEvents = (userEmail) => {
    return (dispatch) => {
      return requestEventsInRange(userEmail)
        .then((plainEventObjects) => {
          setState(plainEventObjects);
          dispatch({
            type: "GETEVENTS",
            payload: plainEventObjects,
          });
          return plainEventObjects
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
  useEffect(() => {
    const requestEventsInRange = async () => {
      const response = await axiosPrivate
        .get(
          `http://localhost:8081/geteventsByUserEmail/${userEmail}`,

          {
            withCredentials: true,
          }
        )
        .then((response) => response.data);
      dispatch({
        type: "GETEVENTS",
        payload: response,
      });
    };
  }, []);

  /* const requestEventsInRange = async (userEmail) => {
    const response = await axiosPrivate
      .get(
        `http://localhost:8081/geteventsByUserEmail/${userEmail}`,
       
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data);
      console.log(response);
    return response;
  }; */
  return requestEvents;
};

export default useEventCalendar;
