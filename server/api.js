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
 * @api {get} /province Get province GeoJSON
 * @apiName GetProvince
 * @apiGroup GeoJSON
 *
 * @apiSampleRequest off
 * @apiParam {String} name Province name.
 * @apiParam {Boolean} file (Optional) Download the response as a JSON file.
 *
 * @apiSuccess {Object} crs Coordinate reference system (CRS) or spatial reference system (SRS)
 * @apiSuccess {String} type Type of geometry.
 * @apiSuccess {Array[]} coordinates Multidimensional array of points that define a geometric shape.
 * @apiSuccess {File} - GeoJSON file of the province including its municipalities if `file=true`.
 *
 * @apiError {Object} 400 Province name query parameter failed the input validation.
 */
router.get('/province', validation.search, GeoJsons.getProvince)

/**
 * @api {get} /municipality Get municipality GeoJSON
 * @apiName GetMunicipality
 * @apiGroup GeoJSON
 *
 * @apiSampleRequest off
 * @apiParam {String} province Province name.
 * @apiParam {String} municipality Municipality name.
 * @apiParam {Boolean} file (Optional) Download the response as a JSON file.
 *
 * @apiSuccess {Object} crs Coordinate reference system (CRS) or spatial reference system (SRS)
 * @apiSuccess {String} type Type of geometry.
 * @apiSuccess {Array[]} coordinates Multidimensional array of points that define a geometric shape.
 * @apiSuccess {File} - GeoJSON file of the province including its municipalities if `file=true`.
 *
 * @apiError {Object} 400 GET name and/or provnice query parameters failed the input validation.
 */
router.get('/municipality', validation.search, GeoJsons.getMunicipality)

module.exports = router
