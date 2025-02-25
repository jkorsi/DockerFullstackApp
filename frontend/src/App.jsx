import React, { useEffect } from "react";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import { addToken } from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogListReducer";
import Logout from "./components/Logout";
import Login from "./components/Login";

const App = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.login);

  const localUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
  if (localUser && user.token === "") {
    user = localUser;
  }
  addToken(user.token);
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  if (user.token === "") {
    return <Login />;
  }

  const headingStyle = {
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <div id="blogs">
        <h2 style={headingStyle}>Blogs</h2>
        <Notification />
        Logged in as: {user.name} {"\n"}
        <Logout />
        {"\n"}
        {"\n"}
        <BlogList />
      </div>
      <BlogForm user={user} />
    </div>
  );
};

export default App;
