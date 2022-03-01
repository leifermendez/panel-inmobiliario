const model = require('../models/storage')
const {matchedData} = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const path = require('path')
const mime = require('mime')
const multer = require('multer')
const managerStorage = require('../service/storage')
const {nanoid} = require('nanoid')
const slugify = require('slugify')

const router = '/public/media/'
const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://locahost.com'
/*********************
 * Private functions *
 *********************/

/**
 *
 */

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
 *
 */
const getFile = (name = null) => new Promise((resolve, reject) => {
  resolve({
    mime: mime.getType(name),
    ext: path.extname(name)
  })
})

/**
 *
 */

const getUrlPath = (mode = '', name = '') => {
  // console.log('..........---------- ', process.env)
  return `${API_URL}/media/${mode}_${name}`
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

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/')
  },
  filename(req, file, cb) {
    cb(null, `${nanoid(3)}-${slugify(file.originalname)}`)
  }
})

const otherType = (file, mime, ext, author) =>
  new Promise(async (resolve) => {
    resolve({
      fileName: file.filename,
      fileType: ext,
      original: `${API_URL}/${file.filename}`,
      author
    })
  })

/********************
 * Public functions *
 ********************/
exports.upload = multer({storage})
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
    res.status(200).json(await db.getItems(req, model, query))
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
    const tenant = req.clientAccount;
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.getItem(id, model, tenant))
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
    const tenant = req.clientAccount;
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    const doesCityExists = await cityExistsExcludingItself(id, req.name)
    if (!doesCityExists) {
      res.status(200).json(await db.updateItem(id, model, req, tenant))
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
    const {files = []} = req;
    const author = req.user;
    const list = files.map(async file => {
      const {mime, ext} = await getFile(file.originalname)
      const isImage = file.mimetype.includes('image');
      let data;
      if (!isImage) {
        data = await otherType(file, file.mimetype, ext, author)
      } else {
        const name = `${nanoid(15)}${ext}`
        await managerStorage.resizeFileOriginal(file.filename, `${name}`)
        data = {
          original: getUrlPath('original', name),
          small: getUrlPath('small', name),
          medium: getUrlPath('medium', name),
          large: getUrlPath('large', name),
          fileType: ext,
          fileName: file.filename,
          author
        };
      }
      return await db.createItem(data, model)
    })

    const all = await Promise.all(list);
    res.status(201).json({data: all})
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
    const tenant = req.clientAccount;
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.deleteItem(id, model, tenant))
  } catch (error) {
    utils.handleError(res, error)
  }
}
