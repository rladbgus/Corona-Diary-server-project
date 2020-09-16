"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Contents",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        covid_date: {
          type: Sequelize.INTEGER,
        },
        referenceFile: Sequelize.STRING,
        q_temp: {
          type: Sequelize.FLOAT,
        },
        q_resp: {
          type: Sequelize.INTEGER,
        },
        q_cough: {
          type: Sequelize.INTEGER,
        },
        q_appet: {
          type: Sequelize.INTEGER,
        },
        q_sleep: {
          type: Sequelize.INTEGER,
        },
        q_fatigue: {
          type: Sequelize.INTEGER,
        },
        q_psy: {
          type: Sequelize.INTEGER,
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
          },
          onDelete: "CASCADE",
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Contents");
  },
};
