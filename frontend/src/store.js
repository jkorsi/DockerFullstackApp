import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import NotificationReducer from "./reducers/notificationReducer";
import BlogListReducer from "./reducers/blogListReducer";
import LoginReducer from "./reducers/loginReducer";

const reducer = combineReducers({
  notification: NotificationReducer,
  blogs: BlogListReducer,
  login: LoginReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
