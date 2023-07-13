const Card = require('../models/card');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../errors/status');
const {
  cardCreateValidationErrorMessage,
  cardBadRequestErrorMessage,
  cardNotFoundErrorMessage,
  cardLikeErrorMessage,
  cardUnlikeErrorMessage,
  serverErrorMessage,
} = require('../errors/messages');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(SERVER_ERROR).send({ message: serverErrorMessage });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: cardCreateValidationErrorMessage,
        });
        return;
      }

      res.status(SERVER_ERROR).send({ message: serverErrorMessage });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: cardBadRequestErrorMessage });
        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ message: cardNotFoundErrorMessage });
        return;
      }

      res.status(SERVER_ERROR).send({ message: serverErrorMessage });
    });
};

const likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: cardLikeErrorMessage,
        });
        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ message: cardNotFoundErrorMessage });
        return;
      }

      res.status(SERVER_ERROR).send({ message: serverErrorMessage });
    });

const unlikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: cardUnlikeErrorMessage });
        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ message: cardNotFoundErrorMessage });
        return;
      }

      res.status(SERVER_ERROR).send({ message: serverErrorMessage });
    });

module.exports = { getCards, createCard, deleteCard, likeCard, unlikeCard };
