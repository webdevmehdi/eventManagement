import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../Utils/axios/axios";

const useRefresh = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newaccessToken = useSelector(
    (state) => state?.authentication.accessToken
  );
  const refresh = async () => {
    let controller = new AbortController();
    try {
      const response = await axiosPrivate
        .get("api/refresh", {
          withCredentials: true,
          signal : controller.signal
        })
        .then((response) => {
          dispatch({
            type: "USERS_LOGIN_SUCCESS",
            accessToken: response?.data.access_token,
            username: response?.data.username,
          });
          return response?.data.access_token;
        });

      return response;
    } catch (error) {
      if (error.response.status === 403) {
        dispatch({
          type: "USERS_LOGOUT",
        });
        navigate("/login");
        // test to cancel pending request after being logged out
        controller.abort();
      return;
      }
    }
  };
  return refresh;
};

export default useRefresh;
