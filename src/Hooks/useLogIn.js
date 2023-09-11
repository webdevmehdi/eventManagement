import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogIn = () => {
  const dipsatch = useDispatch();
  const navigate = useNavigate();
  const newaccessToken = useSelector(
    (state) => state?.authentication.accessToken
  );
  const reqLogin = (email, password) => {
    return (dispatch) => {
      return logIn(email, password)
        .then((response) => {
          console.log(response);
          let username = response.username;
          let accessToken = response.access_token;
          dispatch({
            type: "USERS_LOGIN_SUCCESS",
            username,
            accessToken,
          });
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  const logIn = async (email, password) => {
    const response = await axios
      .post(
        "http://localhost:8081/api/auth/signIn",
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data);
    return response;
  };
  return reqLogin;
};

export default useLogIn;
