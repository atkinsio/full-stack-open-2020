import React, { useState } from 'react';

const BlogForm = ({ handleNewBlogSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const submitBlog = () => {
    handleNewBlogSubmit(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form>
        <div>
          Title:{' '}
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:{' '}
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:{' '}
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button
          type="button"
          onClick={submitBlog}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
