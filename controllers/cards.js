const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({}).then((cards) => {
    res.send(cards);
  });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner }).then((card) => {
    res.status(201).send(card);
  });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).then((card) => {
    res.status(200).send(card);
  });
};

module.exports = { getCards, createCard, deleteCard };
