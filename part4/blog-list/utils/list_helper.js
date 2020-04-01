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

module.exports = {
  totalLikes,
  favouriteBlog
};
