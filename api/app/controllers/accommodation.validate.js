const { validationResult } = require('../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
exports.createItem = [
  check('name').exists(),
  check('address').exists(),
  check('addressOptional').optional(),
  check('state').exists(),
  check('city').exists(),
  check('vote').optional(),
  check('country').exists(),
  check('status').exists(),
  check('channels').optional(),
  check('description').optional(),
  check('gallery').optional(),
  check('location').optional(),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates update item request
 */
exports.updateItem = [
  check('name').optional(),
  check('address').exists(),
  check('addressOptional').optional(),
  check('state').optional(),
  check('city').exists(),
  check('channels').optional(),
  check('vote').optional(),
  check('country').exists(),
  check('status').optional(),
  check('description').optional(),
  check('gallery').optional(),
  check('location').optional(),
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
