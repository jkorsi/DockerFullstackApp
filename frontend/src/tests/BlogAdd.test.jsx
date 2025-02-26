import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { expect, vi } from "vitest";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import AddBlog from "../components/BlogAdd";

// Mock the action creators to avoid network calls:
vi.mock("../reducers/blogListReducer", () => ({
  createBlog: (blog) => ({ type: "CREATE_BLOG", payload: blog }),
  showAndHideMessage: (msg) => ({ type: "SHOW_MESSAGE", payload: msg }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test("BlogAdd calls handleAddBlog with correct content", () => {
  const store = mockStore({});
  store.dispatch = vi.fn();
  const component = render(
    <Provider store={store}>
      <AddBlog user={"testUser"} />
    </Provider>
  );

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const blogurl = component.container.querySelector("#blogurl");
  const form = component.container.querySelector("#form");

  fireEvent.change(title, { target: { value: "Blogtitle" } });
  fireEvent.change(author, { target: { value: "Blog Author" } });
  fireEvent.change(blogurl, { target: { value: "www.blogurl.com" } });
  fireEvent.submit(form);

  expect(store.dispatch).toHaveBeenCalledTimes(2);

  // First dispatch (createBlog)
  const firstCallArg = store.dispatch.mock.calls[0][0];
  if (typeof firstCallArg === "function") {
    const dummyDispatch = vi.fn();
    firstCallArg(dummyDispatch);
    expect(dummyDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: expect.any(String),
        payload: expect.objectContaining({
          title: "Blogtitle",
          author: "Blog Author",
          url: "www.blogurl.com",
          user: "testUser",
          likes: 0,
        }),
      })
    );
  } else {
    expect(firstCallArg).toMatchObject({
      type: expect.any(String),
      payload: expect.objectContaining({
        title: "Blogtitle",
        author: "Blog Author",
        url: "www.blogurl.com",
        user: "testUser",
        likes: 0,
      }),
    });
  }

  // Second dispatch (showAndHideMessage)
  const secondCallArg = store.dispatch.mock.calls[1][0];
  if (typeof secondCallArg === "function") {
    const dummyDispatch = vi.fn();
    secondCallArg(dummyDispatch);
    expect(dummyDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: expect.any(String),
      })
    );
  } else {
    expect(secondCallArg).toMatchObject({
      type: expect.any(String),
    });
  }
});
