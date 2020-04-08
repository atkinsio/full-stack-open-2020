import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ user, blog, removeBlog }) => {
  const [showFullBlog, setShowFullBlog] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleVisibility = () => {
    setShowFullBlog(!showFullBlog);
  };

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    color: 'white'
  };

  const increaseLikes = async () => {
    const newBlog = {
      user: blog.user._id,
      likes: likes + 1,
      author: blog.author,
      title: blog.titile,
      url: blog.url
    };

    const returnedBlog = await blogService.update(blog.id, newBlog);
    setLikes(returnedBlog.likes);
  };

  const showDeleteIfCorrectUser = () => {
    if (blog.user.id.toString() === user.id.toString()) {
      return (
        <div>
          <button type="burron" onClick={() => removeBlog(blog)}>Delete</button>
        </div>
      );
    }

    return null;
  };

  if (!showFullBlog) {
    return (
      <div style={blogStyle}>
        "{blog.title}" by {blog.author}{' '}
        <button type="button" onClick={toggleVisibility}>
          View
        </button>
      </div>
    );
  }

  return (
    <div onClick={toggleVisibility} style={blogStyle}>
      <div>
        "{blog.title}" by {blog.author}{' '}
        <button type="button" onClick={toggleVisibility}>
          Hide
        </button>
      </div>
      <div>{blog.url}</div>
      <div>
        {likes}{' '}
        <button type="button" onClick={increaseLikes}>
          Like
        </button>
      </div>
      <div>{blog.user.name}</div>
      {showDeleteIfCorrectUser()}
    </div>
  );
};

export default Blog;
