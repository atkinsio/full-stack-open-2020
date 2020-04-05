const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

let token = '';

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogs = helper.listWithManyBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogs.map((blog) => blog.save());
  await Promise.all(promiseArray);

  const response = await await api.post('/api/login/').send({
    username: 'root',
    password: 'secret'
  });

  token = response.body.token;
});

describe('when fethcing notes', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(6);
  });

  test('blogs contain the transformed id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });

  test('a specific blog can be returned', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const response = await api
      .get(`/api/blogs/${blogsAtStart[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.title).toEqual(blogsAtStart[0].title);
  });
});

describe('when creating notes', () => {
  test('a valid blog can be added', async () => {
    const newBlog = helper.validBlog;

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('How to be a fullstack master');
  });

  test('if likes property is missing a default value is set', async () => {
    const newBlog = helper.validBlogWithMissingLikes;

    await Blog.deleteMany({});

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(1);

    const likes = blogsAtEnd.map((blog) => blog.likes);
    expect(likes[0]).toBe(0);
  });

  test('if title or url are missing appropiate status is returned', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(helper.blogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(helper.blogWithoutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('when deleting notes', () => {
  test('succeeds with correct status code if id is valid', async () => {
    const newBlog = helper.validBlog;

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogToDelete = response.body;

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('when updating notes', () => {
  test('succeeds with correct status code if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.title = 'This blog title has been updated!';

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain(blogToUpdate.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
