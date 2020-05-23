'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('account', 'jwtVersion', {
      type: Sequelize.INTEGER.UNSIGNED,
      after: 'password',
      defaultValue: 0,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('account', 'jwtVersion');
  },
};
