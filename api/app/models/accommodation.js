const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const {customAlphabet} = require('nanoid')
const nanoid = customAlphabet('1234567890', 10)
const AccommodationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: nanoid
    },
    address: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    addressOptional: {
      type: String,
      required: false
    },
    channels: {
      type: Array,
      required: false,
      default: []
    },
    status: {
      type: String,
      enum: ['available', 'unavailable', 'lead'],
      default: 'unavailable'
    },
    vote: {
      type: Number,
      required: false,
      default: 5
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: false
    },
    gallery: {
      type: Array,
      default: []
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: false
      },
      coordinates: {
        type: [Number],
        required: false
      }
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
    timestamps: true,
  }
)
AccommodationSchema.plugin(aggregatePaginate)
AccommodationSchema.index({location: '2dsphere'})
module.exports = mongoose.model('Accommodation', AccommodationSchema)
