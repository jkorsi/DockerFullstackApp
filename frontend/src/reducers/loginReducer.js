import login from "../services/login";
import { addToken } from "../services/blogs";
import { showAndHideMessage } from "./notificationReducer";

const initialState = {
  name: "",
  token: "",
  username: "",
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      const user = action.data.user;
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      addToken(user.token);
      return user;
    }
    case "LOGOUT":
      window.localStorage.clear();
      return { ...state, name: "", token: "", username: "" };
    default:
      return state;
  }
};

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await login({ username, password });
      dispatch({
        type: "LOGIN",
        data: {
          user,
        },
      });
      dispatch(showAndHideMessage("Login succesful", true, 3));
    } catch (ex) {
      console.log("Exception: ", ex);
      dispatch(showAndHideMessage("Login failed", false, 3));
    }
  };
};

export const userLogout = () => {
  console.log("Logout creator");
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
    dispatch(showAndHideMessage("Logout succesful", true, 3));
  };
};

export default LoginReducer;
