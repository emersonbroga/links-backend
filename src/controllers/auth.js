const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { acountSignUp } = require('../validators/Account');

const router = express.Router();
const saltRounds = 10;

router.post('/sign-in', async (req, res) => {
  return res.json('Sign in Route');
});

router.post('/sign-up', acountSignUp, async (req, res) => {
  const { email, password } = req.body;

  let hash = bcrypt.hashSync(password, saltRounds);
  const result = await Account.create({ email, password: hash });
  return res.jsonOK(result, 'Account created successfully.');
});

module.exports = router;
