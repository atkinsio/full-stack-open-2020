const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', name: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'aaron',
      name: 'Aaron Atkins',
      password: 'secret'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('invalid users are rejected with correct status code', async () => {
    const usersAtStart = await helper.usersInDb();

    const userWithInvalidUsername = {
      username: 'ab',
      name: 'Aaron Atkins',
      password: 'secret'
    };

    const userWithInvalidPassword = {
      username: 'aaron',
      name: 'Aaron Atkins',
      password: 'se'
    };

    const userWithDuplicateUsername = {
      username: 'root',
      name: 'Aaron Atkins',
      password: 'secret'
    };

    await api
      .post('/api/users')
      .send(userWithInvalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/users')
      .send(userWithInvalidPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/users')
      .send(userWithDuplicateUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(userWithInvalidUsername.username);
    expect(usernames).not.toContain(
      userWithInvalidUsername.userWithInvalidPassword
    );
    expect(usernames).toContain(userWithDuplicateUsername.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
