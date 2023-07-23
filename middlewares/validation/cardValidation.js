const { celebrate, Joi } = require('celebrate');

const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum()
  })
})

const likeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum()
  })
})

const unlikeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum()
  })
})

module.exports = { deleteCardValidation, likeCardValidation, unlikeCardValidation }