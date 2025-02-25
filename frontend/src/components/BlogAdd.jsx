import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showAndHideMessage } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogListReducer";

const AddBlog = ({ user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogurl] = useState("");

  const dispatch = useDispatch();

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: blogUrl,
      user: user,
      likes: 0,
    };
    dispatch(createBlog(blogObject));
    console.log("Blogobject:", blogObject);

    setTitle("");
    setAuthor("");
    setBlogurl("");

    const msg = `New blog added. Blog: ${blogObject.title}, Author: ${blogObject.author}`;
    dispatch(showAndHideMessage(msg, true, 3));
  };

  return (
    <form id="form" onSubmit={handleAddBlog}>
      <h2>Add New Blog</h2>
      <div>
        Title:{" "}
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:{" "}
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:{" "}
        <input
          id="blogurl"
          type="text"
          value={blogUrl}
          name="BlogUrl"
          onChange={({ target }) => setBlogurl(target.value)}
        />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default AddBlog;
