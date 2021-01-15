const validator = require('../helpers/validate')
const { RES } = require('../helpers/defines')

const search = (req, res, next) => {
  const validationRule = {
    'name': ['required:string', 'min:5', 'max:30', 'regex:/^[A-Za-z ]+$/'],
    'download': 'boolean'
  }

  validator(req.query, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(RES.BAD_REQUEST).send({
        success: false,
        message: 'Validation failed',
        data: err.message
      })
    } else {
      next()
    }
  })
}

module.exports = {
  search
}