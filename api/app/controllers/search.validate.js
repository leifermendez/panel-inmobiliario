const {validationResult} = require('../middleware/utils')
const {check} = require('express-validator')


exports.getItem = [
  check('q')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

