require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;

module.exports = {
  MONGODB_URI,
  PORT
};
