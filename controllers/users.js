const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({});
};

const getUser = (req, res) => {
  User.findById(req.params.id);
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar });
};

module.exports = { getUsers, getUser, createUser };
