const Accommodation = require('../models/accommodation')
const Bookings = require('../models/booking')
const Task = require('../models/task')
const Events = require('../models/events')
const {matchedData} = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const mongoose = require('mongoose');
const _ = require('lodash');
/*********************
 * Private functions *
 *********************/


/**
 * Gets all items from database
 */
const getAllItemsFromDB = async (model, q = {}, source = '') => {
  return new Promise((resolve, reject) => {
    model.find(
      q,
      '-updatedAt -createdAt',
      {
        sort: {
          name: 1
        },
        $limit: 10
      },
      (err, items) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        } else {
          resolve(items.map((value) => {
            if (['accommodation'].includes(source)) {
              value.set('title', value.name, {strict: false})
              value.set('observation', value.address, {strict: false})
            }
            if (['booking'].includes(source)) {
              value.set('title', `${value.guest.name} ${value.guest.lastName}`, {strict: false})
              value.set('observation', `${value.localizator}`, {strict: false})
            }
            value.set('source', source, {strict: false})
            return value;
          }))
        }
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
    const owner = req.user;
    req = matchedData(req)
    let query = {}
    if (owner && !owner.role.includes('admin')) {
      query = {
        $and: [
          {owner: mongoose.Types.ObjectId(owner._id)}
        ]
      }
    }
    const data = {
      accommodation: await getAllItemsFromDB(Accommodation, {
        ...{
          $or:
            [
              {name: {$regex: new RegExp(req.q, 'i')}},
              {address: {$regex: new RegExp(req.q, 'i')}},
            ]
        }, ...query
      }, 'accommodation'),
      bookings: await getAllItemsFromDB(Bookings, {
        $or:
          [
            {localizator: {$regex: new RegExp(req.q, 'i')}},
            {"guest.name": {$regex: new RegExp(req.q, 'i')}},
            {"guest.lastName": {$regex: new RegExp(req.q, 'i')}},
            // {owner: mongoose.Types.ObjectId(req.user._id)}
          ]
      }, 'booking'),
      // task: await getAllItemsFromDB(Task, {
      //   $or:
      //     [
      //       {title: {$regex: new RegExp(req.q, 'i')}},
      //       {observation: {$regex: new RegExp(req.q, 'i')}}
      //     ]
      // }, 'task'),
      events: await getAllItemsFromDB(Events, {
        $or:
          [
            {title: {$regex: new RegExp(req.q, 'i')}},
            {observation: {$regex: new RegExp(req.q, 'i')}}
          ]
      }, 'event')
    }

    const dataParse = [
      ..._.map(data.accommodation, (value) => [value]),
      ..._.map(data.bookings, (value) => [value]),
      // ..._.map(data.task, (value) => [value]),
      ..._.map(data.events, (value) => [value]),
    ]

    res.status(200).json(dataParse)

  } catch (error) {
    utils.handleError(res, error)
  }
}
