import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ show, showNotification }) => {
  const [blogs, setBlogs] = useState([]);

  const blogFormRef = React.createRef();

  const handleNewBlogSubmit = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = { title, author, url };
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      showNotification(`A new blog "${title}" by ${author} has been added`);
    } catch (exception) {
      showNotification(exception);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (show) {
    return (
      <div>
        <Togglable ref={blogFormRef} buttonLabel="New Blog">
          <BlogForm handleNewBlogSubmit={handleNewBlogSubmit} />
        </Togglable>
        <h2>Blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }

  return <div></div>;
};

export default Blogs;
