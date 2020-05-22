'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('account', 'jwt_version', {
      type: Sequelize.INTEGER.UNSIGNED,
      after: 'password',
      defaultValue: 0,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('account', 'jwt_version');
  },
};
