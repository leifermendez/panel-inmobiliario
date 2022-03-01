const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const StorageSchema = new mongoose.Schema(
  {
    original: {
      type: String,
      required: true
    },
    small: {
      type: String,
      required: false
    },
    medium: {
      type: String,
      required: false
    },
    large: {
      type: String,
      required: false
    },
    fileName: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      required: true
    },
    author: {
      type: Object,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
StorageSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Storage', StorageSchema)
