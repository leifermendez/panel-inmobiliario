const Settings = require('../models/settings')
const Accommodation = require('../models/accommodation')
const Documentation = require('../models/documentation')
const User = require('../models/user')
const db = require('./db')
const mongoose = require('mongoose')
/**
 * Get initial config
 */
const setInitialDataAccommodation = async (id) => {
  const setting = await Settings.findOne({});
  let body = []
  setting.documentsInitial.forEach(i => {
    body.push({
      "name": i.name,
      "form": mongoose.Types.ObjectId(i.form),
      "accommodation": mongoose.Types.ObjectId(id),
      "observation": i.observation,
      "values": {}
    })
  })
  console.log(body)
  Documentation.insertMany(body)
}

exports.modelsAllowed = [
  {
    key: 'user',
    model: User,
    initialValue: []
  },
  {
    key: 'accommodation',
    model: Accommodation,
    initialValue: setInitialDataAccommodation
  }
]
