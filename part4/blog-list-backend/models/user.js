/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const object = returnedObject;
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
    delete object.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
