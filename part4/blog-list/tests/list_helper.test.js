const listHelper = require('../utils/list_helper');
const helper = require('./test_helper');

describe('total likes', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.totalLikes(helper.listWithNoBlogs);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is returned right', () => {
    const result = listHelper.totalLikes(helper.listWithManyBlogs);
    expect(result).toBe(36);
  });
});

describe('favourite blog', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.favouriteBlog(helper.listWithNoBlogs);
    expect(result).toBe(undefined);
  });

  test('when list has only one blog equals that', () => {
    const result = listHelper.favouriteBlog(helper.listWithOneBlog);

    const expectedResult = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    };

    expect(result).toEqual(expectedResult);
  });

  test('of a bigger list is returned right', () => {
    const result = listHelper.favouriteBlog(helper.listWithManyBlogs);

    const expectedResult = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    };
    expect(result).toEqual(expectedResult);
  });
});

describe('most blogs', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostBlogs(helper.listWithNoBlogs);
    expect(result).toBe(undefined);
  });

  test('when list has only one blog equals that', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog);

    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    };

    expect(result).toEqual(expectedResult);
  });

  test('of a bigger list is returned right', () => {
    const result = listHelper.mostBlogs(helper.listWithManyBlogs);

    const expectedResult = {
      author: 'Robert C. Martin',
      blogs: 3
    };
    expect(result).toEqual(expectedResult);
  });
});

describe('most likes', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostLikes(helper.listWithNoBlogs);
    expect(result).toBe(undefined);
  });

  test('when list has only one blog equals that', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog);

    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    };

    expect(result).toEqual(expectedResult);
  });

  test('of a bigger list is returned right', () => {
    const result = listHelper.mostLikes(helper.listWithManyBlogs);

    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    };
    expect(result).toEqual(expectedResult);
  });
});
