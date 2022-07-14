'use strict';

const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users'
  })
  UserTable.associate = models => {
    UserTable.hasMany(models.BlogPost, {
        foreignKey: 'id',
        as: 'BlogPosts'
    })
  }

  return UserTable;
};

module.exports = UserSchema