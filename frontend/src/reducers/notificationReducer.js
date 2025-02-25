import { setTiming, getTiming } from "../misc/timing";

const initialState = {
  message: "Welcome to Anecdotes",
  isSuccess: true,
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.data;
    case "HIDE":
      return "";
    default:
      return state;
  }
};

export const showAndHideMessage = (message, isSuccess, timer) => {
  return (dispatch) => {
    clearTimeout(getTiming());
    dispatch({
      type: "SHOW_NOTIFICATION",
      data: {
        message,
        isSuccess,
      },
    });
    setTiming(
      setTimeout(() => {
        dispatch({
          type: "HIDE",
        });
      }, timer * 1000)
    );
  };
};

export const hideMessage = () => {
  return {
    type: "HIDE",
  };
};

export default NotificationReducer;
