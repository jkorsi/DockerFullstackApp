import { put, create, getAll, remove } from "../services/blogs";

const BlogListReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG": {
      const newBlogs = [...state, action.data];
      return newBlogs;
    }
    case "INIT_BLOGS":
      return action.data;
    case "VOTE": {
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
    }
    case "DELETE":
      return state.filter((blog) => blog.id !== action.data);
    default:
      return state;
  }
};

export const addLike = (id) => {
  return async (dispatch) => {
    //Lazy way, proper usage would be to create getByID() or to use the state
    const blogs = await getAll();
    let blogToUpdate = blogs.find((blog) => blog.id === id);
    blogToUpdate = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id,
    };
    await put(blogToUpdate);
    dispatch({
      type: "VOTE",
      data: {
        ...blogToUpdate,
      },
    });
  };
};

export const createBlog = (data) => {
  return async (dispatch) => {
    const newBlog = await create(data);
    dispatch({
      type: "NEW_BLOG",
      data: newBlog,
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const Blogs = await getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: Blogs,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await remove(id);
    dispatch({
      type: "DELETE",
      data: id,
    });
  };
};

export default BlogListReducer;
