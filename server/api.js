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
 * @apiSuccess {JSON} - GeoJSON data of the province including its municipalities.
 * @apiError {Object} 400 Province name query parameter failed the input validation.
 */
router.get('/province', validation.search, GeoJsons.getProvince)

module.exports = router
