const Card = require('../models/card');
const { OK, CREATED } = require('../errors/status');
const {
  cardCreateValidationErrorMessage,
  cardBadRequestErrorMessage,
  cardNotFoundErrorMessage,
  cardLikeErrorMessage,
  cardUnlikeErrorMessage,
} = require('../errors/messages');
const { NotFoundError, BadRequestError } = require('../errors/errorClasses');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(cardCreateValidationErrorMessage));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardNotFoundErrorMessage);
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(cardBadRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardNotFoundErrorMessage);
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(cardLikeErrorMessage));
      } else {
        next(err);
      }
    });

const unlikeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardNotFoundErrorMessage);
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(cardUnlikeErrorMessage));
      } else {
        next(err);
      }
    });

module.exports = { getCards, createCard, deleteCard, likeCard, unlikeCard };
