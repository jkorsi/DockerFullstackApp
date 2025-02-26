import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { expect, vi } from "vitest";
import configureStore from "redux-mock-store";
import Blog from "../components/Blog";
import thunk from "redux-thunk";

// Mock the actions to prevent network calls:
vi.mock("../reducers/blogListReducer", () => ({
  addLike: (id) => ({ type: "ADD_LIKE", payload: { id } }),
  deleteBlog: (id) => ({ type: "DELETE_BLOG", payload: { id } }),
}));

const mockStore = configureStore([thunk]);

test("blog is rendered only partly by default", () => {
  const user = { name: "x" };
  const blog = {
    author: "Blog Tester",
    title: "Blog testing",
    url: "blogtest.com",
    likes: 0,
    id: "123",
    user: user,
  };

  const store = mockStore({});
  const component = render(
    <Provider store={store}>
      <Blog blog={blog} user={user} />
    </Provider>
  );

  expect(component.container).toHaveTextContent("Blog Tester");
  expect(component.container).toHaveTextContent("Blog testing");
  expect(component.container).not.toHaveTextContent("blogtest.com");
  expect(component.container).not.toHaveTextContent("Likes");
});

test("clicking View button reveals full blog details", () => {
  const user = { name: "x" };
  const blog = {
    author: "Blog Tester",
    title: "Blog testing",
    url: "blogtest.com",
    likes: 0,
    id: "123",
    user: user,
  };

  const store = mockStore({});
  const component = render(
    <Provider store={store}>
      <Blog blog={blog} user={user} />
    </Provider>
  );

  const button = component.getByText("View");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("Blog Tester");
  expect(component.container).toHaveTextContent("Blog testing");
  expect(component.container).toHaveTextContent("blogtest.com");
  expect(component.container).toHaveTextContent("Likes");
});

test("like button can be clicked twice", () => {
  const user = { name: "x" };
  const blog = {
    author: "Blog Tester",
    title: "Blog testing",
    url: "blogtest.com",
    likes: 0,
    id: "123",
    user: user,
  };

  const store = mockStore({});
  store.dispatch = vi.fn(); // Override dispatch

  const component = render(
    <Provider store={store}>
      <Blog blog={blog} user={user} />
    </Provider>
  );

  const viewButton = component.getByText("View");
  fireEvent.click(viewButton);

  const likeButton = component.getByText("Like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(store.dispatch).toHaveBeenCalledTimes(2);
});
