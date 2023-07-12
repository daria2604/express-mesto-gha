const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(404)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      }
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
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные для постановки лайка.',
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res
          .status(404)
          .send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка в работе сервера.' });
      }
    });

const unlikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные для снятия лайка.',
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(404)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера.' });
    });

module.exports = { getCards, createCard, deleteCard, likeCard, unlikeCard };
