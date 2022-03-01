const {validationResult} = require('../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates create new item request
 */
exports.createItem = [
  check('localizator').exists(),
  check('guest').exists(),
  check('portal').exists(),
  check('adults').exists(),
  check('accommodation').exists(),
  check('kids').exists(),
  check('checkIn').exists(),
  check('checkOut').exists(),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates update item request
 */
exports.updateItem = [
  check('localizator').exists(),
  check('guest').exists(),
  check('portal').exists(),
  check('adults').exists(),
  check('accommodation').exists(),
  check('kids').exists(),
  check('checkIn').exists(),
  check('checkOut').exists(),
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates get item request
 */
exports.getItem = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates delete item request
 */
exports.deleteItem = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]


/**
 * Validates create new item request
 */
exports.createEvent = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('body').exists(),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]
