import React, { useState } from "react";
import Notification from "./Notification";
import { useDispatch } from "react-redux";

import { userLogin } from "../reducers/loginReducer";

const Login = () => {
  const dispatch = useDispatch();
  //const state = useSelector(state => state.state)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(userLogin(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Blogs Log In</h2>
        <Notification />
        <div>
          Username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
