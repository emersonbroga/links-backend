const express = require('express');
const router = express.Router();

router.get('/sign-in', (req, res) => {
  return res.json('Sign in route');
});

router.get('/sign-up', (req, res) => {
  return res.json('Sign up route');
});

module.exports = router;
