import { useDispatch } from "react-redux";
import axios from "../axios/axios";

const useLogOut = () => {
  const dispatch = useDispatch();

  const logOut = async () => {
    try {
      const response = await axios.get("/api/logOut", { withCredentials: true });
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.error(err);
    }
  };

  return logOut;
};

export default useLogOut;
