const express = require('express')
const trimRequest = require('trim-request')
const passport = require('passport')
const controller = require('../controllers/plugins')
const validate = require('../controllers/plugins.validate')

const router = express.Router()
require('../../config/passport')

const requireAuth = passport.authenticate('jwt', {
  session: false
})

router.get(
  '/:id/events/:action',
  requireAuth,
  trimRequest.all,
  validate.actionsPlugin,
  controller.actionForPlugin
)

/*
   * Post item events
   */
router.post(
  '/:id/events/:action',
  requireAuth,
  trimRequest.all,
  validate.actionsPlugin,
  controller.actionForPlugin
)

module.exports = router
