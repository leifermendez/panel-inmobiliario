const {validationResult} = require('../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates create new item request
 */
exports.createItem = [
  check('name').exists(),
  check('fields').exists(),
  check('terms').optional(),
  check('customData').optional(),
  check('slug').optional(),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates update item request
 */
exports.updateItem = [
  check('name').exists(),
  check('fields').exists(),
  check('terms').optional(),
  check('customData').optional(),
  check('slug').optional(),
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