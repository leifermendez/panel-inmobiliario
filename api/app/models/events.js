const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const {customAlphabet} = require('nanoid')
const nanoid = customAlphabet('abcdef', 20)

const EventsSchema = new mongoose.Schema(
  {
    start: {
      type: Date,
      default: null,
      required: true
    },
    end: {
      type: Date,
      default: null
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    observation: {
      type: String,
      default: '',
      required: false
    },
    color: {
      type: String,
      default: 'yellow',
      required: false
    },
    allDay: {
      type: Boolean,
      default: true
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    behavior: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      enum: ['default', 'task', 'booking'],
      default: 'default'
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
EventsSchema.plugin(aggregatePaginate)
module.exports = mongoose.model('Events', EventsSchema)
