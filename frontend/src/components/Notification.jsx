import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const noteStyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
  };

  if (!notification.message) {
    return (
      <div className="error" style={noteStyle}>
        {"\n"}
      </div>
    );
  }

  var color = notification.isSuccess ? "#3cb52f" : "red";
  const successStyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "100%",
    fontSize: "30px",
    fontWeight: "bold",
    color: color,
  };

  return (
    <div className="error" style={successStyle}>
      {notification.message}
    </div>
  );
};

export default Notification;
