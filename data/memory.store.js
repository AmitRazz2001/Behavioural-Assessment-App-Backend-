const store = {};

exports.save = (userId, data) => {
  store[userId] = data;
};

exports.get = (userId) => store[userId];
