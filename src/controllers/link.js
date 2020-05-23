const express = require('express');
const { Link } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const accountId = req.accountId || 1;
  const { label, url, icon, isSocial, order } = req.body;
  const links = await Link.findAll({ where: { accountId } });
  return res.jsonOK(links);
});

router.get('/:id', async (req, res) => {
  const accountId = req.accountId || 2;
  const { id } = req.params;
  const link = await Link.findOne({ where: { accountId, id } });
  if (!link) return res.jsonNotFound();
  return res.jsonOK(link);
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

router.put('/:id', async (req, res) => {
  const accountId = req.accountId || 2;
  const { body } = req;
  const { id } = req.params;
  const fields = ['label', 'icon', 'url', 'isSocial', 'order'];

  const link = await Link.findOne({ where: { accountId, id } });
  if (!link) return res.jsonNotFound();

  fields.map((fieldName) => {
    const newValue = body[fieldName];
    if (newValue) link[fieldName] = newValue;
  });
  await link.save();
  return res.jsonOK(link);
});

router.delete('/:id', async (req, res) => {
  const accountId = req.accountId || 2;
  const { id } = req.params;

  const link = await Link.findOne({ where: { accountId, id } });
  if (!link) return res.jsonNotFound();
  await link.destroy();
  return res.jsonOK();
});

module.exports = router;
