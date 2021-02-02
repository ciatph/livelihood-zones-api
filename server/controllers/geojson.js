const model = require('../models')
const { GeoJson } = model
const { RES, POSTGIS } = require('../helpers/defines')
const { capitalize, filedownload } = require('../helpers/utils')

class GeoJsons {
  constructor() {}
  
  /**
   * Return the GeoJSON of municipalities that make up a province
   * @param {*} req
   * @param {*} res
   */
  static async getProvince(req, res) {
    let { name, file } = req.query
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
            'id',         ${POSTGIS.ID},
            'geometry',   ST_AsGeoJSON(${POSTGIS.GEOM_COLUMN})::jsonb,
            'properties', to_jsonb(inputs) - '${POSTGIS.ID}' - '${POSTGIS.GEOM_COLUMN}'
          ) AS feature
          FROM (SELECT * FROM ${POSTGIS.TABLE}
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

    if (!data[0].jsonb_build_object.features) {
      return res.status(RES.NOT_FOUND).send({
        message: 'Province not found.'
      })
    } else {
      if (file) {
        // Return a GeoJSON file for download
        filedownload(res, name, data[0].jsonb_build_object)
      } else {
        // Return a GeoJSON response object
        return res.json(data[0].jsonb_build_object)
      }
    }
  }

  /**
   * Return the GeoJSON of a municipality
   * @param {*} req
   * @param {*} res
   */
  static async getMunicipality(req, res) {
    const { province, municipality, file } = req.query
    let data

    try {
      const queryString = `
        SELECT jsonb_build_object(
          'type',       'Feature',
          'geometry',   ST_AsGeoJSON(${POSTGIS.GEOM_COLUMN})::jsonb,
          'properties', to_jsonb(inputs) - '${POSTGIS.ID}' - '${POSTGIS.GEOM_COLUMN}'
        ) AS feature
        FROM (SELECT * FROM ${POSTGIS.TABLE}
          WHERE adm2_en like :PROVINCE_NAME
          AND adm3_en like :MUNICIPALITY_NAME
          AND adm2_en != '' AND adm3_en != '') inputs`

      data = await GeoJson.sequelize.query(queryString, {
        replacements: {
          PROVINCE_NAME: `${capitalize(province)}%`,
          MUNICIPALITY_NAME: `${capitalize(municipality)}%`
        },
        type: model.sequelize.QueryTypes.SELECT
      })
    } catch (err) {
      return res.status(RES.INTERNAL_SERVER_ERROR).send({
        message: err.message
      })
    }

    if (!data) {
      return res.status(RES.NOT_FOUND).send({
        message: 'Municipality not found.'
      })
    } else {
      if (file) {
        // Return a GeoJSON file for download
        const name = `${province}_${municipality}`.replace(/ /g, '')
        filedownload(res, name, data ? data[0].feature : {})
      } else {
        // Return a GeoJSON response object
        res.json(data ? data[0].feature : {})
      }
    }
  }
}

module.exports = GeoJsons
