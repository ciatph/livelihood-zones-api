const express = require('express')
const router = express.Router()
const Utils = require('./controllers/utils')
const GeoJsons = require('./controllers/geojson')
const validation = require('./middleware/validation-middleware')

/**
 * @api {get} /ping Ping server
 * @apiName GetPing
 * @apiGroup Utils
 *
 * @apiSampleRequest off
 * @apiSuccess {200} - HTTP 200 response code
 * @apiSuccessExample Success-Response:
 *  HTTP:/1.1 200 OK
 * @apiErrorExample Error-Response:
 *  Failed to load response data
 */
router.get('/ping', Utils.ping)

/**
 * @api {get} /province Get province
 * @apiName GetProvince
 * @apiGroup GeoJSON
 * @apiDescription Get the GeoJSON `FeatureCollection` object of a province including its municipalities, each with its individual `features`.
 *
 * @apiSampleRequest off
 * @apiParam {String} name Province name.
 * @apiParam {Boolean} [file] Download the response as a JSON file.
 *
 * @apiSuccess {String} type GeoJSON type.
 * @apiSuccess {Object[]} features List of municipality features.
 * @apiSuccess {Number} features.id Unique identification number.
 * @apiSuccess {String} features.type Feature
 * @apiSuccess {Object} features.geometry Geometry definition.
 * @apiSuccess {String} features.geometry.type Geometry type.
 * @apiSuccess {Array[]} features.geometry.coordinates Multidimensional array of two-dimensional locations (points) in longitude and latitude that define a geometric shape.
 * @apiSuccess {Object} features.properties Additional information (shapefile column attributes).
 * @apiSuccess {String} features.properties.adm2_en Province name.
 * @apiSuccess {String} features.properties.adm3_en Municipality name.
 * @apiSuccess {String} features.properties.livelihood Livelihood zone.
 * @apiSuccess {File} - JSON file of the province including its municipalities if `file=true`.
 *
 * @apiError {Object} 400 Province `name` or `file` query parameters failed the input validation.
 */
router.get('/province', validation.search, GeoJsons.getProvince)

/**
 * @api {get} /municipality Get municipality
 * @apiDescription Get the GeoJSON geometry object of municipality.
 * @apiName GetMunicipality
 * @apiGroup GeoJSON
 *
 * @apiSampleRequest off
 * @apiParam {String} province Province name.
 * @apiParam {String} municipality Municipality name.
 * @apiParam {Boolean} [file] Download the response as a JSON file.
 *
 * @apiSuccess {Object} crs Coordinate reference system (CRS) or spatial reference system (SRS).
 * @apiSuccess {String} crs.type CRS type.
 * @apiSuccess {Object} crs.properties CRS information object.
 * @apiSuccess {String} crs.properties.name CRS Name.
 * @apiSuccess {String} type Type of geometry.
 * @apiSuccess {Array[]} coordinates Multidimensional array of two-dimensional locations (points) in longitude and latitude that define a geometric shape.
 * @apiSuccess {File} - JSON file of the province including its municipalities if `file=true`.
 *
 * @apiError {Object} 400 `municipality`, `provnice` or `file` query parameters failed the input validation.
 */
router.get('/municipality', validation.search, GeoJsons.getMunicipality)

module.exports = router
