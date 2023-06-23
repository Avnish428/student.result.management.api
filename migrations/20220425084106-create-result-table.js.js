"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("results", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      score: {
        type: Sequelize.ENUM("A", "B","C","D","E","F"),
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
    });
    await queryInterface.addConstraint('results', {
      fields: ['studentId', 'courseId'],
      type: 'unique',
      name: 'unique_studentId_courseId'
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("results");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_user_type";'
    );
  },
};
