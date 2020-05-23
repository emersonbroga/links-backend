const express = require('express');
const { Link } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const accountId = req.accountId || 1;
  const { label, url, icon, isSocial, order } = req.body;
  const links = await Link.findAll({ where: { accountId } });
  return res.jsonOK(links);
});

router.post('/', async (req, res) => {
  const accountId = req.accountId || 2;
  const { label, url, icon, isSocial, order } = req.body;
  const link = await Link.create({
    label,
    url,
    icon,
    isSocial,
    order,
    accountId,
  });
  return res.jsonOK(link);
});

module.exports = router;
