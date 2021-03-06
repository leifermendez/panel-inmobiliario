const controller = require('../controllers/storage')
const validate = require('../controllers/storage.validate')
const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

/*
 * Cities routes
 */

/*
 * Get all items route
 */
// router.get('/all', controller.getAllItems)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  trimRequest.all,
  controller.getItems
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  trimRequest.all,
  controller.upload.array('files[]'),
  controller.createItem
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  trimRequest.all,
  validate.getItem,
  controller.getItem
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  trimRequest.all,
  validate.updateItem,
  controller.updateItem
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  trimRequest.all,
  validate.deleteItem,
  controller.deleteItem
)

module.exports = router
