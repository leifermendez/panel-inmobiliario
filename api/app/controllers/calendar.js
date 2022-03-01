const webHook = require('../service/webhook');
const model = require('../models/events')
const {matchedData} = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const moment = require('moment')
const i18n = require('i18n')
const _ = require('lodash');

/*********************
 * Private functions *
 *********************/

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
    const data = db.getLookEvents(model, query, req.user)
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
    res.status(200).json(await db.getItem(id, model))
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
    const doesCityExists = await cityExistsExcludingItself(id, req.name)
    if (!doesCityExists) {
      res.status(200).json(await db.updateItem(id, model, req))
    }
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
    i18n.setLocale(req.getLocale());
    const dataAuthor = req.user;
    req = matchedData(req)
    let title = ''
    let observation = ''
    if (req.mode === 'visit') {
      title = i18n.__(
        'calendarService.visit.TITLE',
        req.accommodation.name
      )
      observation = i18n.__(
        'calendarService.call.OBSERVATION',
        `${dataAuthor.name}`,
        `${moment(req.date).format('LLL')}`
      )
    }
    if (req.mode === 'call') {
      title = i18n.__(
        'calendarService.call.TITLE'
      )
      observation = i18n.__(
        'calendarService.call.OBSERVATION',
        `${dataAuthor.name}`,
        `${moment(req.date).format('LLL')}`
      )
    }
    req = {
      ...req, ...{
        owner: dataAuthor._id,
        behavior: {
          mode: "router",
          router: null,
          target: null
        },
        title,
        observation,
        start: req.date,
        end: req.date
      }
    }
    const data = await db.createItem(req, model)
    res.status(201).json(data)
    await webHook.webHookInstance('addTask', data)
  } catch (error) {
    utils.handleError(res, error)
  }
}
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
