"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: "User_Tag",
        foreignKey: "tagId",
        as: "user",
        onDelete: "cascade",
      });
      this.belongsToMany(models.Content, {
        through: "Content_Tag",
        foreignKey: "tagId",
        as: "content",
        onDelete: "cascade",
      });
    }
  }
  Tag.init(
    {
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
