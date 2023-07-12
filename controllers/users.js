const User = require('../models/user');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../errors/status');
const {
  userBadRequestErrorMessage,
  userNotFoundErrorMessage,
  userCreateValidationErrorMessage,
  userUpdateValidationErrorMessage,
  avatarUpdateValidationErrorMessage,
  serverErrorMessage,
} = require('../errors/messages');

const options = {
  new: true, // обработчик then получит на вход обновлённую запись
  runValidators: true, // данные будут валидированы перед изменением
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(OK).send(users);
    })
    .catch((err) => {
      res.status(SERVER_ERROR).send({ message: serverErrorMessage });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: userBadRequestErrorMessage,
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ message: userNotFoundErrorMessage });
      }
      res.status(SERVER_ERROR).send({ message: serverErrorMessage });
    });
};

const createUser = (req, res) =>
  User.create({ ...req.body })
    .then((user) => {
      res.status(CREATED).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: userCreateValidationErrorMessage,
        });
      }
      res.status(SERVER_ERROR).send({ message: serverErrorMessage });
    });

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: userUpdateValidationErrorMessage,
        });
      }
      if (err.name === 'CastError') {
        res.status(NOT_FOUND).send({ message: userNotFoundErrorMessage });
      }
      res.status(SERVER_ERROR).send({ message: serverErrorMessage });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: avatarUpdateValidationErrorMessage,
        });
      }
      if (err.name === 'CastError') {
        res.status(NOT_FOUND).send({ message: userNotFoundErrorMessage });
      }
      res.status(SERVER_ERROR).send({ message: serverErrorMessage });
    });
};

module.exports = { getUsers, getUser, createUser, updateProfile, updateAvatar };
