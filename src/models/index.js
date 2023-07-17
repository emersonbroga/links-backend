'use strict';
import Sequelize from 'sequelize';
import configs from '../config/config.js';

import Account from './account.js';
import Link from './link.js';

const env = process.env.NODE_ENV || 'development';
const config = configs[env] || {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
  Account: Account(sequelize, Sequelize),
  Link: Link(sequelize, Sequelize),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
