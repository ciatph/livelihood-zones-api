require('dotenv').config()
const model = require('../models')
const { GeoJson } = model
const { RES } = require('../helpers/defines')

class GeoJsons {
  constructor() {}
  
  static async getProvince(req, res) {
    const { province } = req.query || req.body
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
            WHERE adm2_en like '${province}%'
            AND adm2_en != '' AND adm3_en != '' LIMIT 1) inputs) features`

      data = await GeoJson.sequelize.query(queryString, {
        type: model.sequelize.QueryTypes.SELECT
      })
    } catch (err) {
      return res.status(RES.INTERNAL_SERVER_ERROR).send()
    }

    return res.status(RES.OKAY).send(JSON.stringify(data[0].jsonb_build_object))
  }
}

module.exports = GeoJsons
