import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import response from './middlewares/response.js';
import checkJwt from './middlewares/jwt.js';

import authController from './controllers/auth.js';
import linkController from './controllers/link.js';

const app = express();

app.use(cors());
app.use(response);
app.use(checkJwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
