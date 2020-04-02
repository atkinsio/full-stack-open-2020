const _ = require('lodash');

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  const likes = [...blogs.map((blog) => blog.likes)];

  if (likes.length === 0) {
    return undefined;
  }

  const highestLikes = Math.max(...likes);
  const highestLikedBlog = blogs.find((blog) => blog.likes === highestLikes);

  return {
    title: highestLikedBlog.title,
    author: highestLikedBlog.author,
    likes: highestLikedBlog.likes
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  const groupedBlogs = _.groupBy(blogs, 'author');

  const sortedBlogs = Object.keys(groupedBlogs)
    .map((author) => {
      return { author, blogs: groupedBlogs[author] };
    })
    .sort((a, b) => {
      return b.blogs.length - a.blogs.length;
    });

  return { author: sortedBlogs[0].author, blogs: sortedBlogs[0].blogs.length };
};

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs
};
