const {matchedData} = require('express-validator')
const plugins = require('../models/plugins')
const pluginsSettings = require('../models/pluginsSettings')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const mongoose = require('mongoose')

/*********************
 * Private functions *
 *********************/

/**
 * Gets all items from database
 */
const getFind = async (query = {}) => new Promise((resolve, reject) => {
  pluginsSettings.findOne(query,(err, items) => {
    if (err) {
      reject(utils.buildErrObject(422, err.message))
    }
    resolve(items)
  })
})

const findPluginSetting = (id, mode = 'id') => new Promise((resolve, reject) => {
  let query = {};
  if (mode === 'id') {
    query = {'plugin._id': mongoose.Types.ObjectId(id)};
  } else {
    query = {'plugin.path': id};
  }
  pluginsSettings.findOne(query, 'plugin', (err, item) => {
      if (!err) {
        resolve(item)
      } else {
        reject(err)
      }
    })
})

/********************
 * Public functions *
 ********************/

exports.actionForPlugin = async (req, res) => { //value
  try {
    const dataUser = req.user;
    req = matchedData(req)
    const {id, action, value} = req
    const parentModule = await findPluginSetting(id, 'path');
    /**
     * Check if plugin exist in app system
     */
    await db.getItemQueryWithOutTenant({
      path: id
    }, plugins)
    /**
     * Check if client enabled plugin
     */
    await getFind({
      'plugin.path': id,
      status: 'enabled'
    })

    const singleModule = require(`../plugins/${id}`)

    /** Action is a Method name for use **/
    res.status(201).json(await singleModule[action](parentModule, value, dataUser))
  } catch (error) {
    error = {
      code: 422,
      message: (error.message) ? error.message : 'ERROR_INTERNAL',
      error
    }
    utils.handleError(res, error)
  }
}
