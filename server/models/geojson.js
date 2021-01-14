'use strict'
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
    ogc_fid: DataTypes.INTEGER,
    wkb_geometry: DataTypes.GEOMETRY,
    adm3_en: DataTypes.STRING,
    adm2_en: DataTypes.STRING,
    livelihood: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GeoJson',
  })
  return GeoJson
}