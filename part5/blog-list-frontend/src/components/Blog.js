import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [showFullBlog, setShowFullBlog] = useState(false);

  const toggleVisibility = () => {
    setShowFullBlog(!showFullBlog);
  };

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    color: 'white'
  }

  if (!showFullBlog) {
    return (
      <div style={blogStyle}>
        "{blog.title}" by {blog.author}{' '}
        <button type="button" onClick={toggleVisibility}>View</button>
      </div>
    );
  }

  return (
    <div onClick={toggleVisibility} style={blogStyle}>
      <div>
        "{blog.title}" by {blog.author}{' '}
        <button type="button" onClick={toggleVisibility}>Hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        {blog.likes}{' '}
        <button type="button">Like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
