require('dotenv').config()
const moment = require('moment')
const model = require('../models')
const { GeoJson } = model
const { RES } = require('../helpers/defines')

class GeoJsons {
  constructor() {}
  
  /**
   * Return the GeoJSON of municipalities that make up a province
   * @param {*} req
   * @param {*} res
   */
  static async getProvince(req, res) {
    const { province } = req.query || req.body
    const id = process.env.GEO_PRIMARY_KEY
    const geom = process.env.GEO_COLUMN
    const table = process.env.GEO_TABLE
    let data

    if (!province) {
      return res.status(RES.BAD_REQUEST).send({
        message: 'Invalid query parameter.'
      })
    }

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
            AND adm2_en != '' AND adm3_en != '') inputs) features`

      data = await GeoJson.sequelize.query(queryString, {
        type: model.sequelize.QueryTypes.SELECT
      })
    } catch (err) {
      return res.status(RES.INTERNAL_SERVER_ERROR).send({
        message: err.message
      })
    }

    // Additional GeoJSON returned by a WMS
    const json = data[0].jsonb_build_object
    json.totalFeatures = 'unknown'
    json.timeStamp = moment().toISOString()
    json.crs = {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:EPSG::4326'
      }
    }

    if (!data[0].jsonb_build_object.features) {
      json.features = []
      json.numberReturned = 0
    } else {
      json.numberReturned = json.features.length
      json.features.forEach((item, index) => {
        json.features[index].id = json.features[index].id.toString()
        json.features[index].geometry_name = 'the_geom'
      })
    }

    return res.json(json)
  }

  static getAdditionalJSON() {
    const json = {}
    json.totalFeatures = 'unknown',
    json.numberReturned = json.features.length
    json.timeStamp = moment().toISOString()

    json.features.forEach((item, index) => {
      json.features[index].id = json.features[index].id.toString()
      json.features[index].geometry_name = 'the_geom'
    })

    json.crs = {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:EPSG::4326'
      }
    }

    return json
  }
}

module.exports = GeoJsons
