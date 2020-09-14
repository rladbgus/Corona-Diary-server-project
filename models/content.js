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
      });
      this.hasMany(models.Like, {
        foreignKey: "contentId",
        as: "like",
      });
      this.belongsToMany(models.Tag, {
        through: "Content_Tag",
        foreignKey: "contentId",
        as: "tag",
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
      q_temp: {
        type: DataTypes.FLOAT,
      },
      q_resp: {
        type: DataTypes.INTEGER,
      },
      q_cough: {
        type: DataTypes.INTEGER,
      },
      q_appet: {
        type: DataTypes.INTEGER,
      },
      q_sleep: {
        type: DataTypes.INTEGER,
      },
      q_fatigue: {
        type: DataTypes.INTEGER,
      },
      q_psy: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Content",
    }
  );
  return Content;
};
