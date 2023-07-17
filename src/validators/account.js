import Joi from '@hapi/joi';
import { getValidatorError } from '../helpers/validator.js';

const rules = {
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z-0-9]{3,30}$')),
  password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
};

const options = { abortEarly: false };

export const accountSignIn = (req, res, next) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: rules.email,
    password: rules.password,
  });

  const { error } = schema.validate({ email, password }, options);
  if (error) {
    const messages = getValidatorError(error, 'account.signin');
    return res.jsonBadRequest(null, null, { error: messages });
  }

  next();
};

export const accountSignUp = (req, res, next) => {
  const { email, password, password_confirmation } = req.body;

  const schema = Joi.object({
    email: rules.email,
    password: rules.password,
    password_confirmation: rules.password_confirmation,
  });

  const { error } = schema.validate({ email, password, password_confirmation }, options);
  if (error) {
    const messages = getValidatorError(error, 'account.signup');
    return res.jsonBadRequest(null, null, { error: messages });
  }

  next();
};
