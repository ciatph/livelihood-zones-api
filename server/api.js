const express = require('express')
const router = express.Router()
const Utils = require('./controllers/utils')
const GeoJsons = require('./controllers/geojson')

router.get('/ping', Utils.ping)
router.get('/province', GeoJsons.getProvince)

module.exports = router
