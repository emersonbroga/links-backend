const express = require('express');
const db = require('./models');
const path = require('path');

const response = require('./middlewares/response');
const authController = require('./controllers/auth');
const linkController = require('./controllers/link');

const app = express();

app.use(response);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authController);
app.use('/link', linkController);

app.get('/', (req, res) => {
  return res.json('Api running...');
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Listening on port 3001');
  });
});
