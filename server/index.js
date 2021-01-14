const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
const api = require('./api')

app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.disable('x-powered-by')

app.use('/api', api)

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}/api/ping`)
})
