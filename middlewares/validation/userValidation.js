const { celebrate, Joi } = require('celebrate');
const { default: mongoose } = require('mongoose');
const regex= require('../../utils/regex');

const userIdValidation = (value, helper) =>
  mongoose.isValidObjectId(value)
    ? value
    : helper.message('Передан некорректный id пользователя.');


const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(userIdValidation),
  }),
})

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex),
  }),
});

module.exports = {
  loginValidation,
  signUpValidation,
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
};
