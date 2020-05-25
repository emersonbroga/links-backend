const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');

const router = express.Router();

const saltRounds = 10;

router.get('/sign-in', (req, res) => {
  return res.json('Sign in.');
});

router.get('/sign-up', async (req, res) => {
  const { email, password } = req.body;

  const account = await Account.findOne({ where: { email } });
  if (account) return res.json('Account already exists');

  const hash = bcrypt.hashSync(password, saltRounds);
  const newAccount = await Account.create({ email, password: hash });

  return res.json(newAccount);
});

module.exports = router;
