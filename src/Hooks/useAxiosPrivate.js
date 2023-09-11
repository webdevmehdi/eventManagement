import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";
import { useSelector, shallowEqual } from "react-redux";
import useIsMounted from "./useIsMounted";
import { axiosPrivate } from "../Utils/axios/axios";

const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const isMounted = useIsMounted();
  const accessToken = useSelector(
    (state) => state.authentication.accessToken,
    shallowEqual
  );

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
          console.log(config);
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const previousRequest = error.config;
        if (error.response.status === 401 && !previousRequest._retry) {
          previousRequest._retry = true;
          let newToken = await refresh();
          console.log(newToken);
          if (newToken) {
            previousRequest.headers["Authorization"] = `Bearer ${newToken}`;
          }
          return axiosPrivate(previousRequest);
        }
      },
      (error) => {
        console.log(error.response.status)
        Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [isMounted, accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
