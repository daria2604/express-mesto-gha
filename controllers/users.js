const User = require('../models/user');

const options = {
  new: true, // обработчик then получит на вход обновлённую запись
  runValidators: true, // данные будут валидированы перед изменением
};

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

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, options).then((user) =>
    res.status(200).send(user)
  );
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, options).then((user) =>
    res.status(200).send(user)
  );
};

module.exports = { getUsers, getUser, createUser, updateProfile, updateAvatar };
