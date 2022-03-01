const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const SettlementSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    file: {
      type: [Object],
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    accommodation: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    type: {
      type: String,
      enum: ['invoice', 'settlement']
    },
    customData: {
      type: Object
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
SettlementSchema.plugin(aggregatePaginate)
module.exports = mongoose.model('Settlement', SettlementSchema)
