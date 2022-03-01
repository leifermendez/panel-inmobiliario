const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const {customAlphabet} = require('nanoid')
const nanoid = customAlphabet('abcdef', 20)
const FormsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    fields: {
      type: Object,
      required: true,
      default: []
    },
    terms: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: nanoid,
      unique: true
    },
    endPoint: {
      type: String,
      default: null
    },
    customData: {
      type: Object
    },
    dummy: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
FormsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Forms', FormsSchema)
