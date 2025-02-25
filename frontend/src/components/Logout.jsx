import React from "react";
import { useDispatch } from "react-redux";

import { userLogout } from "../reducers/loginReducer";
const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  return (
    <button type="button" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default Logout;
