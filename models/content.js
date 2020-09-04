"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      this.hasMany(models.Comment, {
        foreignKey: "contentId",
        as: "comment",
        onDelete: "cascade",
      });
      this.belongsToMany(models.Tag, {
        through: "Content_Tag",
        foreignKey: "contentId",
        as: "tag",
        onDelete: "cascade",
      });
    }
  }
  Content.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      covid_date: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      referenceFile: DataTypes.STRING,
      like: { type: DataTypes.INTEGER, defaultValue: 0 },
      q_temp: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      q_resp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      q_cough: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      q_appet: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      q_sleep: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      q_fatigue: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      q_psy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Content",
    }
  );
  return Content;
};
