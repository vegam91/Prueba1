'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies_categories', {
      relation_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      movie_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'movies',
          key: 'movie_id',
        },
      }, deleted: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movies_categories');
  }
};
