const controller = require('../controllers/search')
const validate = require('../controllers/search.validate')
const AuthController = require('../controllers/auth')
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

router.get(
  '/',
  requireAuth,
  trimRequest.all,
  validate.getItem,
  controller.getItems
)


module.exports = router
