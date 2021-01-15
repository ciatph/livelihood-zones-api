const express = require('express')
const router = express.Router()
const Utils = require('./controllers/utils')
const GeoJsons = require('./controllers/geojson')
const validation = require('./middleware/validation-middleware')

router.get('/ping', Utils.ping)
router.get('/province', validation.search, GeoJsons.getProvince)

module.exports = router
