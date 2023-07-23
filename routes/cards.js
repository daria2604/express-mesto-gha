const router = require('express').Router();
const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  unlikeCardValidation,
} = require('../middlewares/validation/cardValidation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', deleteCardValidation, deleteCard);
router.put('/:cardId/likes', likeCardValidation, likeCard);
router.delete('/:cardId/likes', unlikeCardValidation, unlikeCard);

module.exports = router;
