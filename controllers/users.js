const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  });
};

const getUser = (req, res) => {
  User.findById(req.params.userId).then((user) => {
    res.status(200).send(user);
  });
};

const createUser = (req, res) =>
  User.create({ ...req.body }).then((user) => {
    res.status(201).send(user);
  });

module.exports = { getUsers, getUser, createUser };
