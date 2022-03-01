const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const {customAlphabet} = require('nanoid')
const nanoid = customAlphabet('abcdef', 20)
const DocumentationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    form: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    accommodation: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    values: {
      type: Object,
      default: {},
      required: true
    },
    binnacleValues: {
      type: Object,
      default: {},
      required: false
    },
    observation: {
      type: String,
      default: ''
    },
    percentage: {
      type: String,
      default: '0'
    },
    formsActive: {
      type: Boolean,
      default: false
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
DocumentationSchema.plugin(aggregatePaginate)
module.exports = mongoose.model('Documentation', DocumentationSchema)
