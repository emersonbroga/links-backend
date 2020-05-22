const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { acountSignIn, acountSignUp } = require('../validators/Account');
const { generateJwt, generateRefreshJwt } = require('../helpers/jwt');
const { getMessageByPath } = require('../helpers/validator');

const router = express.Router();
const saltRounds = 10;

router.post('/sign-in', acountSignIn, async (req, res) => {
  const { email, password } = req.body;
  const account = await Account.findOne({ where: { email } });
  const match = account ? await bcrypt.compare(password, account.password) : null;
  const message = getMessageByPath('account.signin.invalid');
  if (!match) return res.jsonBadRequest(null, null, { errors: { email: message } });

  const token = generateJwt({ id: account.id });
  const refreshToken = generateRefreshJwt({ id: account.id, version: account.version });
  const success = getMessageByPath('account.signin.success');
  return res.jsonOK(account, success, { token, refreshToken });
});

router.post('/sign-up', acountSignUp, async (req, res) => {
  const { email, password } = req.body;

  let hash = bcrypt.hashSync(password, saltRounds);
  const account = await Account.create({ email, password: hash });
  const token = generateJwt({ id: account.id });
  const refreshToken = generateRefreshJwt({ id: account.id, version: account.jwt_version });
  const success = getMessageByPath('account.signup.success');
  return res.jsonOK(account, success, { token, refreshToken });
});

module.exports = router;
