"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("course", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      courseName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      // deletedAt: {
      //   type: Sequelize.DATE,
      //   allowNull: true,
      // },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("course");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_user_type";'
    );
  },
};
