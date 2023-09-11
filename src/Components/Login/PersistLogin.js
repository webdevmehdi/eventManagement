import { useState, useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useRefresh from "../../Hooks/useRefresh";
import { useNavigate } from "react-router-dom";
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefresh();
  const navigate = useNavigate();
  const token = useSelector((state) => state?.authentication.accessToken);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      setIsLoading(false);
    } else if (!token) {
      verifyRefreshToken();
    }
    // token ? setIsLoading(false) : verifyRefreshToken();

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;

/* 
import { useState, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import useRefresh from "../../Hooks/useRefresh";
import {axiosPrivate} from "../../Utils/axios/axios";
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefresh();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state?.authentication.accessToken);

  useEffect(() => {
    const controller = new AbortController();
    const verifyRefreshToken = async () => {
      try {
        const response = await axiosPrivate
          .get("api/refresh", {
            withCredentials: true,
            signal: controller.signal,
          })
          .then((response) => {
            dispatch({
              type: "USERS_LOGIN_SUCCESS",
              accessToken: response?.data.access_token,
              username: response?.data.username,
            });
            return response?.data.access_token;
          })
          .catch((error) => {
            console.log(error.request.status);
            dispatch({
              type: "USERS_LOGOUT",
            });
            navigate("/login");
          });

        return response;
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      setIsLoading(false);
    } else if (!token) {
      verifyRefreshToken();
    }
    // token ? setIsLoading(false) : verifyRefreshToken();
    return () => {
      controller.abort();
    };
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
 */
