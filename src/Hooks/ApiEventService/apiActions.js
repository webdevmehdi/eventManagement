import axios from "axios";
import { isUndefined } from "lodash";
import { logout } from "../../features/authenticationSlice";
export const setupInterceptor = (accessToken, dispatch) => {
  /*   const controller = new AbortController();
   */
  const axiosPrivate = axios.create({
    baseURL: "http://localhost:8081/",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    withCredentials: true,
    //signal: controller.signal,
  });
  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"] && accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      console.log(error);
    }
  );

  axiosPrivate.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const previousRequest = error.config;
      if (error?.response?.status === 401 && !previousRequest._retry) {
        previousRequest._retry = true;
        try {
          const response = await axios
            .get("http://localhost:8081/api/refresh", { withCredentials: true })
            .then((response) => response.data);
          dispatch({
            type: "USERS_LOGIN_SUCCESS",
            accessToken: response?.access_token,
            username: response?.username,
          });
          if (response.access_token) {
            previousRequest.headers[
              "Authorization"
            ] = `Bearer ${response.access_token}`;
          }
          return axiosPrivate(previousRequest);
        } catch (error) {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          //403 to refresh "refresh_token" , the error is thrown when refresh_token expires
          if (error?.response?.status === 403) {
            dispatch({
              type: "USERS_LOGOUT",
            });
          }
        }
        // empty block to ensure the logout when 403 error ,dont know why , maybe you can find it
      } else {
        console.log(error?.response);
        throw error;
      }
    },

    //Promise.reject is blocking the request call after /api/refresh
    (error) => {
      console.log(error);
    }
  );
  return axiosPrivate;
};
export default setupInterceptor;
