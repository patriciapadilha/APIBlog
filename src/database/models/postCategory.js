'use strict'

const postCategorySchema = (sequelize, DataTypes) => {
  const postCategoriesTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
          model: 'BlogPost',
          key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
          model: 'Category',
          key: 'id'
      }
    }
  }, {
      timestamps: false,
      tableName: 'PostCategories',
  });

  postCategoriesTable.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        foreignKey: 'categoryId',
        as: 'categories',
        through: postCategoriesTable,
        otherKey: 'postId',
      });

    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'postId',
      as: 'BlogPosts',
      through: postCategoriesTable,
      otherKey: 'categoryId',
    });
  }
  
  return postCategoriesTable;
};
  
module.exports = postCategorySchema;