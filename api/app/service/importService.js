const User = require('../models/user')
const Accommodation = require('../models/accommodation')
const db = require('../middleware/db')
const utils = require('../middleware/utils')
const mongoose = require('mongoose')
const csv = require('csv-parser')
const fs = require('fs')
const multer = require('multer')
const dir = `uploads/`

/**
 * Private functions
 */

const findAndInsert = async (data = {}, model = null, query = {}) => {
  return model.findOneAndUpdate(
    query,
    data, {
      new: true,
      upsert: true,
      runValidators: true
    });
}

const importUser = (file = {}, duplicate = false, res) => {
  let results = [];
  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', async (data) => {
      results.push(data)
      data = {
        ...data, ...{
          role: 'user',
          lastName: data.last_name,
          password: '12345678'
        }
      }
      if (data && data.email !== 'NULL') {
        await findAndInsert(data, User, {email: data.email}, duplicate)
      }
    })
    .on('end', () => {
      res.status(201).json({data: 'IMPORT_SUCCESS'})
    });
}

const importAccommodation = async (file = {}, duplicate = false, res) => {
  const findUser = await User.findOne({email: 'admin@admin.com'})
  let results = [];
  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', async (data) => {

      results.push(data)
      const coordinates = [
        isNaN(parseFloat(data.lng)) ? 0 : parseFloat(data.lng),
        isNaN(parseFloat(data.lat)) ? 0 : parseFloat(data.lat),
      ]
      data = {
        ...data, ...{
          customData: {
            idKairos: data.id
          },
          owner: mongoose.Types.ObjectId(findUser._id),
          location: {
            type: 'Point',
            coordinates: coordinates,
          }
        }
      }
      await findAndInsert(data, Accommodation, {"customData.idKairos": data.customData.idKairos}, duplicate)
    })
    .on('end', () => {
      res.status(201).json({data: 'IMPORT_SUCCESS'})
    });
}

exports.upload = multer({dest: dir})

exports.importFile = async (req, res) => {
  try {

    if (!req.file && req.file.path) {
      db.buildErrObject(422, 'ERROR_WITH_FILTER')
    }
    if (req.body && req.body.type === 'host') {
      importUser(req.file, false, res)
    }
    if (req.body && req.body.type === 'accommodation') {
      importAccommodation(req.file, false, res)
    }
  } catch (e) {
    utils.handleError(res, {code: 500, message: 'ERROR_FILE_EMPTY'})
  }
}
