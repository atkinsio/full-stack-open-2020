import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ user, showNotification }) => {
  const [blogs, setBlogs] = useState([]);
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
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

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to delete blog "${blog.title}"?`))
      try {
        await blogService.remove(blog.id);
        setBlogs(await blogService.getAll());
        showNotification(`Blog "${blog.title}" successfully removed`);
      } catch (exception) {
        showNotification(exception);
      }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (user) {
    return (
      <div>
        <Togglable ref={blogFormRef} buttonLabel="New Blog">
          <BlogForm handleNewBlogSubmit={handleNewBlogSubmit} />
        </Togglable>
        <h2>Blogs</h2>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            removeBlog={handleDeleteBlog}
          />
        ))}
      </div>
    );
  }

  return <div></div>;
};

export default Blogs;
