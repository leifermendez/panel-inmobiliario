const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const SettingsSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    terms: {
      type: String
    },
    privacy: {
      type: String
    },
    info:{
      type: String
    },
    documentsInitial:{
      type:Array,
      default:[]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
SettingsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Settings', SettingsSchema)
