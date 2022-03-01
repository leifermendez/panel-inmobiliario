const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const {customAlphabet} = require('nanoid')
const nanoid = customAlphabet('abcdef', 10)

const GuestSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    required: true
  },
  lastName: {
    type: String,
    default: '',
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other'
  },
  nationality: {
    type: String,
    default: '',
    required: true
  },
  phone: {
    type: String,
    default: '',
    required: false
  },
  email: {
    type: String,
    default: '',
    required: false
  },
  language: {
    type: String,
    default: 'en',
    required: false
  }
})

const BookingSchema = new mongoose.Schema(
  {
    localizator: {
      type: String,
      default: null,
      required: true
    },
    guest: {
      type: GuestSchema,
      default: null,
      required: true
    },
    portal: {
      type: String,
      required: true,
      default: null
    },
    accommodation: {
      type: mongoose.Types.ObjectId,
      required: true,
      default: null
    },
    adults: {
      type: Number,
      required: true,
      default: 0
    },
    kids: {
      type: Number,
      required: true,
      default: 0
    },
    checkIn: {
      type: Date,
      required: true
    },
    checkOut: {
      type: Date,
      required: true
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
BookingSchema.plugin(aggregatePaginate)
module.exports = mongoose.model('Booking', BookingSchema)
