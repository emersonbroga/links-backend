const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');

const router = express.Router();
const saltRounds = 10;

router.post('/sign-in', async (req, res) => {
  return res.json('Sign in Route');
});

router.post('/sign-up', async (req, res) => {
  const { email, password } = req.body;

  const user = await Account.findOne({ where: { email } });
  if (user) return res.jsonBadRequest(null, 'Account already exists.');

  let hash = bcrypt.hashSync(password, saltRounds);
  const result = await Account.create({ email, password: hash });
  return res.jsonOK(result, 'Account created successfully.');
});

module.exports = router;
