"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Comments",
          "depth",
          {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Comments",
          "group",
          {
            type: Sequelize.DataTypes.INTEGER,
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Comments", "depth", { transaction: t }),
        queryInterface.removeColumn("Comments", "group", { transaction: t }),
      ]);
    });
  },
};
