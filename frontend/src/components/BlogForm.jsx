import React, { useState } from "react";
import BlogAdd from "./BlogAdd";

const BlogForm = (user) => {
  const [blogAddVisible, setBlogAddVisibility] = useState(false);

  const hideWhenVisible = { display: blogAddVisible ? "none" : "" };
  const showWhenVisible = { display: blogAddVisible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogAddVisibility(true)}>
          Open Blog Form
        </button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={() => setBlogAddVisibility(false)}>Close Form</button>
        <BlogAdd user={user} />
      </div>
    </div>
  );
};

export default BlogForm;
