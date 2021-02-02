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
 * @apiError (Error 4xx) {Error} 400 Query parameter validation has failed.
 * @apiError (Error 4xx) {Error} 404 The province was not found.
 * @apiError (Error 5xx) {Error} 500 Internal server error.
 */
router.get('/province', validation.search, GeoJsons.getProvince)

/**
 * @api {get} /municipality Get municipality
 * @apiDescription Get the GeoJSON `Feature` object of a municipality.
 * @apiName GetMunicipality
 * @apiGroup GeoJSON
 *
 * @apiSampleRequest off
 * @apiParam {String} province Province name.
 * @apiParam {String} municipality Municipality name.
 * @apiParam {Boolean} [file] Download the response as a JSON file.
 *
 * @apiSuccess {String} type GeoJSON type.
 * @apiSuccess {Object} features.geometry Geometry definition.
 * @apiSuccess {String} features.geometry.type Geometry type.
 * @apiSuccess {Array[]} features.geometry.coordinates Multidimensional array of two-dimensional locations (points) in longitude and latitude that define a geometric shape.
 * @apiSuccess {Object} properties One or more name-value pairs (from a shapefile Attributes table).
 * @apiSuccess {File} - JSON file of the province including its municipalities if `file=true`.
 *
 * @apiError (Error 4xx) {Error} 400 Query parameter validation has failed.
 * @apiError (Error 4xx) {Error} 404 The municipality was not found.
 * @apiError (Error 5xx) {Error} 500 Internal server error.
 */
router.get('/municipality', validation.search, GeoJsons.getMunicipality)

module.exports = router
