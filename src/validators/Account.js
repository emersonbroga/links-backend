const Joi = require('@hapi/joi');
const { Account } = require('../models');
const { getMessageByPath, getValidationErrors } = require('../helpers/validator');

const rules = {
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  password_confirmation: Joi.any().valid(Joi.ref('password')).required(),
};

const acountSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: rules.email,
    password: rules.password,
  });
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const validationErrors = getValidationErrors(error, 'account.signin');
    return res.jsonBadRequest(null, null, { errors: validationErrors });
  }

  next();
};

const acountSignUp = async (req, res, next) => {
  const { email, password, password_confirmation } = req.body;
  const schema = Joi.object({
    email: rules.email,
    password: rules.password,
    password_confirmation: rules.password_confirmation,
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const validationErrors = getValidationErrors(error, 'account.signup');
    return res.jsonBadRequest(null, null, { errors: validationErrors });
  } else {
    const user = await Account.findOne({ where: { email } });
    const message = getMessageByPath(`account.signup.email.exists`);
    if (user) return res.jsonBadRequest(null, null, { errors: { email: message } });
  }
  next();
};

module.exports = { acountSignIn, acountSignUp };
