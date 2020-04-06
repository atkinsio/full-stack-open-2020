import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
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
      likes: blog.likes,
      author: blog.author,
      title: blog.titile,
      url: blog.url
    };

    newBlog.likes = newBlog.likes + 1;

    const returnedBlog = await blogService.update(blog.id, newBlog);
    setLikes(returnedBlog.likes)
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
        {likes} <button type="button" onClick={increaseLikes}>Like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
  );
};

export default Blog;
