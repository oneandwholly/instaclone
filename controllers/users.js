const User = require('../models/user');

exports.getUsers = (req, res, next) => {
  if (req.query.onlyToken) {
    const user_id = req.user.id;
    return User.getOneById(user_id, (error, user) => {
      return res.json(user);
    });
  }
  if (req.query.username) {
    const username = req.query.username;
    return User.getOneByUsername(username, (error, user) => {
      const { id, username, email, created_at } = user;
      return res.json({ id, username, email, created_at});
    })
  }

  if (req.query.id) {
    const id = req.query.id;
    return User.getOneById(id, (error, user) => {
      return res.json(user);
    })
  }

  next();
}

exports.getOneById = (req, res, next) => {
  const user_id = req.params.id;
  return User.getOneById(user_id, (error, user) => {
    return res.json(user);
  });
  next();
}

exports.test = (req, res, next) => {
  const token = req.get('authorization');
  if (token) {
    next();
  }
  res.json({test: 'test'})
}
