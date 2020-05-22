module.exports = (sequelize, DataTypes) => {
  const options = {
    underscored: '1',
    freezeTableName: '1',
    tableName: 'account',
  };

  const Account = sequelize.define(
    'Account',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jwt_version: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
    },
    options,
  );

  Account.prototype.toJSON = function () {
    let values = { ...this.get() };
    delete values.password;
    return values;
  };

  return Account;
};
