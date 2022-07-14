'use strict';

const blogPostSchema = (sequelize, DataTypes) => {
  const blogPostTable = sequelize.define('BlogPost', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published:  DataTypes.DATE,
    updated:  DataTypes.DATE,
  });
  blogPostTable.associate = models => {
    blogPostTable.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'Users'
    })
  }

  return blogPostTable;
};

module.exports = blogPostSchema;