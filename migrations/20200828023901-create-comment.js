"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Comments",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: "Users",
              key: "id",
            },
            onDelete: "CASCADE",
          },
        },
        contentId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: "Contents",
              key: "id",
            },
            onDelete: "CASCADE",
          },
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Comments");
  },
};
