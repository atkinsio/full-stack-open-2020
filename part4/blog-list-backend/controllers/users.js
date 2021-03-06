const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    likes: 1,
    url: 1
  });
  response.json(users.map((user) => user.toJSON()));
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;

  if (body.password.length < 4) {
    return response
      .status(400)
      .json({ error: 'password must be 3 characters or longer' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await user.save();

  return response.json(savedUser);
});

module.exports = usersRouter;
