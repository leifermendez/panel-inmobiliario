const {validationResult} = require('../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates create new item request
 */
exports.createItem = [
  check('mode')
    .isIn(['call', 'visit', 'message'])
    .exists(),
  check('observation').optional(),
  check('accommodation').optional(),
  check('date')
    .optional(),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

