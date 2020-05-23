module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jwtVersion: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
  });

  Account.prototype.toJSON = function () {
    let values = { ...this.get() };
    delete values.password;
    return values;
  };

  Account.associate = (models) => {
    Account.hasMany(models.Link, {
      foreignKey: 'accountId',
    });
  };
  return Account;
};
