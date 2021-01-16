require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
const api = require('./api')

app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.disable('x-powered-by')

// Redirect http to https on heroku
if (process.env.IS_HEROKU_APP) {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.headers.host}${req.baseUrl}`)
    } else {
      next()
    }
  })
}

app.use(express.static(path.join(__dirname, '..', 'client')))
app.use('/api', api)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
