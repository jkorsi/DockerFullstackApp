import React from "react";
import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  blogs.sort(compareLikes);

  function compareLikes(a, b) {
    //Sort descending
    return b.likes - a.likes;
  }

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <div id="blogs">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
        {"\n"}
      </div>
    </div>
  );
};

export default BlogList;
