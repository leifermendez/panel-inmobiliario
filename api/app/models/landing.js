const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const {customAlphabet} = require('nanoid')
const nanoid = customAlphabet('abcdef', 20)
const LandingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    forms: {
      type: [mongoose.Types.ObjectId],
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
LandingSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Landing', LandingSchema)
