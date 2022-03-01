const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const {customAlphabet} = require('nanoid')
const nanoid = customAlphabet('abcdef', 20)

const NotificationSchema = new mongoose.Schema(
  {
    receptor: {
      type: mongoose.Types.ObjectId,
      required: false,
      default: null,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
      default: null
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    },
    seen: {
      type: Boolean,
      required: false,
      default: false
    },
    behavior: {
      type: String,
      enum: ['modal', 'route'],
      default: 'route'
    },
    event: {
      type: Object,
      required: false
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
NotificationSchema.plugin(aggregatePaginate)
module.exports = mongoose.model('Notifications', NotificationSchema)
