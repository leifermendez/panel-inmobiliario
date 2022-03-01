const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const {customAlphabet} = require('nanoid')
const nanoid = customAlphabet('abcdef', 10)
const moment = require('moment')
const CommentsSchema = new mongoose.Schema({
  comment: {
    type: Object
  },
  user: {
    type: Object
  },
  dateCreate: {
    type: Date,
    default: moment().toISOString()
  }
})

const TaskSchema = new mongoose.Schema(
  {
    should_start_at: {
      type: Date,
      default: moment().toISOString(),
      required: true
    },
    should_end_at: {
      type: Date,
      default: moment().add(1, 'day').toISOString(),
      required: true
    },
    start_at: {
      type: Date
    },
    finish_at: {
      type: Date
    },
    status: {
      type: String,
      enum: ['completed', 'cancel', 'pause', 'pending', 'developing'],
      default: 'pending'
    },
    title: {
      type: String
    },
    observation: {
      type: String
    },
    attachment: {
      type: Array
    },
    comments: {
      type: [CommentsSchema],
      default: []
    },
    categories: {
      type: Array
    },
    seen: {
      type: Array
    },
    users_subscriptions: {
      type: Array
    },
    tags: {
      type: Array
    },
    binnacle: {
      type: Array
    },
    accommodation: {
      type: mongoose.Types.ObjectId,
      default: null,
      required: true
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true
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
TaskSchema.plugin(aggregatePaginate)
module.exports = mongoose.model('Task', TaskSchema)
