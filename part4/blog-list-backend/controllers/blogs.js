const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
// const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'Title or URL missing' });
  }

  const blog = new Blog({ title, author, url, likes });
  const savedBlog = await blog.save();
  return response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'Title or URL missing' });
  }

  const blog = { title, author, url, likes };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  });

  if (!updatedBlog) {
    return response.status(400).end();
  }

  return response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
