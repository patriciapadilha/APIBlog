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
    published:  {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    }, 
    
  }, 
  {
    timestamps: false
  }
  );
  
  blogPostTable.associate = models => {
    blogPostTable.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
    })
  }

  return blogPostTable;
};

module.exports = blogPostSchema;