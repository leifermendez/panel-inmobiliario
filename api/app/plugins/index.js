const mongoose = require('mongoose')
const fs = require('fs')
const routesPath = `${__dirname}/`
const model = require('../models/plugins')
const namePlugin = []

/**
 * Install plugin on model `pluginsSettings`
 * @param file
 * @returns {Promise<unknown>}
 */
const installPlugin = (file = null) => new Promise((resolve, reject) => {
  fs.readFile(`${routesPath}/${file}/info.json`,
    (err, data) => {
      if (!err) {
        data = JSON.parse(data)
        const query = { path: data.path }
        const options = { upsert: true, new: true, setDefaultsOnInsert: true }
        model.findOneAndUpdate(query, data, options, (error, result) => {
          if (!err) {
            resolve(result)
          }
        })
      } else {
        reject(false)
      }
    })
})

fs.readdirSync(routesPath).filter((file) => new Promise((resolve) => {
  const check = fs.lstatSync(`${routesPath}/${file}`).isDirectory()
  if (check) {
    installPlugin(file).then(() => {
      require(`${routesPath}/${file}/index.js`)
      namePlugin.push(file)
      resolve(true)
    })
  }
}))


/**
 * Public methods
 */

exports.modules = () => namePlugin

exports.modFindById = (_id = null) => new Promise((resolve, reject) => {
  model.findById(mongoose.Types.ObjectId(_id), (err, item) => {
    if (err) {
      reject(err)
    } else {
      resolve(item)
    }
  })
})
