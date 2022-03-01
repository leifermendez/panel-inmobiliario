const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const AccommodationFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
AccommodationFormSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AccommodationForms', AccommodationFormSchema)
