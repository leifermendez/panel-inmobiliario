const model = require('../models/documentation')
const percentageByForm = require('../service/percentageByForm')
const findDiffAnwser = require('../service/findDiffAnwser')
const {matchedData} = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const _ = require('lodash');
const form = require('../models/forms')
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

const addForms = (acc, res) => {
  try {
    const dataForms = [
      {
        form: 'form_1',
        title: 'Características de tu vivienda'
      },
      {
        form: 'form_2',
        title: 'Especificaciones técnicas'
      },
      {
        form: 'form_3',
        title: 'Valores añadidos'
      }
    ]
    let dataDoc = {}
    _.map(dataForms, (a) => {
      form.find({ slug: a.form }, (_err, item) => {
        dataDoc = {
          name: a.title,
          form: item[0]._id,
          accommodation: acc,
          observation: a.title,
          values: {}
        }
        db.createItem(dataDoc, model).then()
      })
    })
  } catch (error) {
    utils.handleError(res, error)
  }
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
    const data = db.getLookDocs(model, query, req.user)
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
 * Update answers function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.answersItem = async (req, res) => {
  try {
    const author = req.user;
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    const beforeData = await db.getItem(id, model)
    const slugForm = await db.getItem(beforeData.form, form)
    const percentageInt = await percentageByForm.calculate(id, req.values.forms)
    const diff = findDiffAnwser.checkJson(beforeData.values, req.values, author)
    req = {
      ...req,
      ...{
        percentage: percentageInt,
        binnacleValues: [].concat(beforeData.binnacleValues).concat(diff)
      }
    }

    if (
      !beforeData.formsActive &&
      slugForm.slug === 'contract-form' &&
      percentageInt >= 48
    ) {
      addForms(beforeData.accommodation, res)
      req.formsActive = true
    }
    res.status(200).json({
      ...(await db.updateItem(id, model, req))._doc,
      slugForm: slugForm.slug
    })
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
    req = matchedData(req)
    res.status(201).json(await db.createItem(req, model))
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
