const info = (...params) => {
  console.log('info: ', ...params);
};

const error = (...params) => {
  console.error('error: ', ...params);
};

module.exports = {
  info,
  error
};
