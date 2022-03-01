const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/task')
const validate = require('../controllers/task.validate')

const router = express.Router()
require('../../config/passport')

const requireAuth = passport.authenticate('jwt', {
  session: false
})


router.post(
  '/:task',
  requireAuth,
  trimRequest.all,
  validate.createComment,
  controller.createComment
)

router.patch(
  '/:task/:id',
  requireAuth,
  // AuthController.roleAuthorization(['user']),
  trimRequest.all,
  validate.updateComment,
  controller.updateComment
)


router.delete(
  '/:task/:id',
  requireAuth,
  // AuthController.roleAuthorization(['user']),
  trimRequest.all,
  validate.deleteComment,
  controller.deleteItem
)
module.exports = router
