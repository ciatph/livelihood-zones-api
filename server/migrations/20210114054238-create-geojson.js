'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GeoJsons', {
      gid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      geom: {
        type: Sequelize.GEOMETRY
      },
      adm3_en: {
        type: Sequelize.STRING
      },
      adm2_en: {
        type: Sequelize.STRING
      },
      livelihood: {
        type: Sequelize.STRING
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('GeoJsons')
  }
}