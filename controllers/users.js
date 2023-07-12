const User = require('../models/user');

const options = {
  new: true, // обработчик then получит на вход обновлённую запись
  runValidators: true, // данные будут валидированы перед изменением
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const createUser = (req, res) =>
  User.create({ ...req.body })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера.' });
    });

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
      }
      if (err.name === 'CastError') {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      }
      if (err.name === 'CastError') {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

module.exports = { getUsers, getUser, createUser, updateProfile, updateAvatar };
