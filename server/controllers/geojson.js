require('dotenv').config()
const model = require('../models')
const { GeoJson } = model
const { RES } = require('../helpers/defines')
const { capitalize } = require('../helpers/utils')

class GeoJsons {
  constructor() {}
  
  /**
   * Return the GeoJSON of municipalities that make up a province
   * @param {*} req
   * @param {*} res
   */
  static async getProvince(req, res) {
    let { name } = req.query
    const id = process.env.GEO_PRIMARY_KEY
    const geom = process.env.GEO_COLUMN
    const table = process.env.GEO_TABLE
    let data

    try {
      const queryString = `
        SELECT jsonb_build_object(
          'type',     'FeatureCollection',
          'features', jsonb_agg(features.feature)
        )
        FROM (
          SELECT jsonb_build_object(
            'type',       'Feature',
            'id',         ${id},
            'geometry',   ST_AsGeoJSON(${geom})::jsonb,
            'properties', to_jsonb(inputs) - '${id}' - '${geom}'
          ) AS feature
          FROM (SELECT * FROM ${table}
            WHERE adm2_en like :PROVINCE_NAME
            AND adm2_en != '' AND adm3_en != '') inputs) features`

      data = await GeoJson.sequelize.query(queryString, {
        replacements: { PROVINCE_NAME: `${capitalize(name)}%` },
        type: model.sequelize.QueryTypes.SELECT
      })
    } catch (err) {
      return res.status(RES.INTERNAL_SERVER_ERROR).send({
        message: err.message
      })
    }

    return res.json(data[0].jsonb_build_object)
  }

  /**
   * Return the GeoJSON of a municipality
   * @param {*} req
   * @param {*} res
   */
  static async getMunicipality(req, res) {
    const { province, name } = req.query
    let data

    try {
      data = await GeoJson.findOne({
        attributes: ['geom'],
        where: { adm2_en: capitalize(province), adm3_en: capitalize(name) }
      })
    } catch (err) {
      return res.status(RES.INTERNAL_SERVER_ERROR).send({
        message: err.message
      })
    }

    res.json(data ? data.dataValues.geom : {})
  }
}

module.exports = GeoJsons
