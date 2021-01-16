const validator = require('../helpers/validate')
const { RES } = require('../helpers/defines')
const rules = require('../helpers/validation-rules')

const search = (req, res, next) => {
  const validationRule = rules[req.path.substr(1, req.path.length)]

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