import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import BlogForm from './BlogForm';

const Blogs = ({ show }) => {
  const [blogs, setBlogs] = useState([]);

  const handleNewBlogSubmit = async (title, author, url) => {
    const newBlog = {title, author, url};
    const returnedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(returnedBlog));
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (show) {
    return (
      <div>
        <BlogForm handleNewBlogSubmit={handleNewBlogSubmit} />
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
    );
  }

  return <div></div>
};

export default Blogs;
