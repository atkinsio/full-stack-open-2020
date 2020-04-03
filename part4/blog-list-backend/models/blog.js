/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: false },
  url: { type: String, required: true },
  likes: { type: Number, required: false, default: 0 }
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const blog = returnedObject;
    blog.id = blog._id.toString();
    delete blog._id;
    delete blog.__v;
  }
});

module.exports = mongoose.model('Blog', blogSchema);
