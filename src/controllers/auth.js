const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignIn, accountSignUp } = require('../validators/Account');
const { generateJwt, generateRefreshJwt, verifyRefreshJwt } = require('../helpers/jwt');
const { getMessageByPath } = require('../helpers/validator');

const router = express.Router();
const saltRounds = 10;

router.post('/sign-in', accountSignIn, async (req, res) => {
  const { email, password } = req.body;
  const account = await Account.findOne({ where: { email } });
  const match = account ? await bcrypt.compare(password, account.password) : null;
  const error = getMessageByPath('account.signin.invalid');
  if (!match) return res.jsonBadRequest(null, null, { errors: { email: error } });

  const token = generateJwt({ id: account.id });
  const refreshToken = generateRefreshJwt({ id: account.id, version: account.jwtVersion });
  const success = getMessageByPath('account.signin.success');
  return res.jsonOK(account, success, { token, refreshToken });
});

router.post('/sign-up', accountSignUp, async (req, res) => {
  const { email, password } = req.body;

  let hash = bcrypt.hashSync(password, saltRounds);
  const account = await Account.create({ email, password: hash });
  const token = generateJwt({ id: account.id });
  const refreshToken = generateRefreshJwt({ id: account.id, version: account.jwtVersion });
  const success = getMessageByPath('account.signup.success');
  return res.jsonOK(account, success, { token, refreshToken });
});

router.post('/refresh', async (req, res) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  token = token ? token.slice(7, token.length) : null;
  try {
    const decoded = verifyRefreshJwt(token);
    const account = await Account.findByPk(decoded.id);

    if (!account) return res.jsonUnauthorized(null, 'Invalid refresh token.');

    const { id, jwtVersion } = account;
    if (decoded.version !== jwtVersion) {
      return res.jsonUnauthorized(null, 'Invalid refresh token.');
    }

    const meta = {
      token: generateJwt({ id }),
      refreshToken: generateRefreshJwt({ id, version: jwtVersion }),
    };
    return res.jsonOK(null, null, meta);
  } catch (error) {
    return res.jsonUnauthorized(null, 'Invalid refresh token.');
  }
});

module.exports = router;
