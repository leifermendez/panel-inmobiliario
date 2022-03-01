const webHook = require('../service/webhook');
const model = require('../models/task')
const {matchedData} = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const mongoose = require('mongoose')
const _ = require('lodash');
const eventService = require('../service/events')

/*********************
 * Private functions *
 *********************/
const modelsAllowed = [
  {
    key: 'user',
    model: require('../models/user')
  },
  {
    key: 'accommodation',
    model: require('../models/accommodation')
  }
]
/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name - name of item
 */
const cityExistsExcludingItself = async (id, name) => {
  return new Promise((resolve, reject) => {
    model.findOne(
      {
        name,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        utils.itemAlreadyExists(err, item, reject, 'CITY_ALREADY_EXISTS')
        resolve(false)
      }
    )
  })
}

/**
 * Gets all items from database
 */
const getAllItemsFromDB = async () => {
  return new Promise((resolve, reject) => {
    model.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          name: 1
        }
      },
      (err, items) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }
        resolve(items)
      }
    )
  })
}

/********************
 * Public functions *
 ********************/

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAllItems = async (req, res) => {
  try {
    res.status(200).json(await getAllItemsFromDB())
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query)
    const data = db.getLookTask(model, query, req.user)
    res.status(200).json(await db.getItemsAggregate(req, model, data))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    const data = db.getLookTaskSingle(model, {_id: mongoose.Types.ObjectId(id)})
    res.status(200).json(await db.getItemAggregate(data, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    const data = await db.updateItem(id, model, req);
    res.status(200).json(data)
    await webHook.webHookInstance('editTask', data)
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createItem = async (req, res) => {
  try {
    const dataAuthor = req.user;
    req = matchedData(req)
    req = {...req, ...{owner: dataAuthor._id}}
    const data = await db.createItem(req, model, db.getLookTaskSingle);
    await eventService.setEvent(data, req, 'task')
    await webHook.webHookInstance('addTask', data, {model, query: {_id: data._id}})
    res.status(201).json(data)
  } catch (error) {
    utils.handleError(res, error)
  }
}
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createEvent = async (req, res) => {
  try {
    const allowed = _.map(modelsAllowed, (o) => o.key)

    req = matchedData(req)
    if (allowed.includes(req.id)) { //Models allowed
      const {body, id} = req
      const {model} = _.find(modelsAllowed, {key: id})
      res.status(201).json(await db.createItem(body, model))
    } else {
      utils.buildErrObject(422, 'NOT_MODEL_ALLOW')
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}
/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.deleteItem(id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}
/**
 * Create comment associate tu Task
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.createComment = async (req, res) => {
  try {
    const dataAuthor = req.user;
    req = matchedData(req)
    const idTask = await utils.isIDGood(req.task)
    const body = {
      $push: {
        comments: {
          user: dataAuthor,
          comment: req.observation
        }
      }
    }
    res.status(201).json(await db.updateItem(idTask, model, body))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update comment associate tu Task
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateComment = async (req, res) => {
  try {
    req = matchedData(req)
    const idTask = await utils.isIDGood(req.task)
    const _id = await utils.isIDGood(req.id)
    req = {
      $set: {
        'comments.$.comment': req.observation
      }
    }
    const editTicket = await db.updateItemOne({
      _id: idTask,
      comments: {$elemMatch: {_id}}
    }, model, req)
    res.status(200).json(editTicket)
  } catch (error) {
    utils.handleError(res, error)
  }

}
