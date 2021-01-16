'use strict'
const { MAX_LENGTH } = require('../helpers/defines')
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class GeoJson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GeoJson.init({
    gid: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    geom: DataTypes.GEOMETRY,
    adm3_en: DataTypes.STRING,
    adm2_en: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, MAX_LENGTH.PROVINCE]
      }
    },
    livelihood: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GeoJson',
  })
  return GeoJson
}