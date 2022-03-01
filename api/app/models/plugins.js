const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PluginsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true,
      unique: true
    },
    video: {
      type: String,
      required: false
    },
    features: {
      type: Object,
      required: true
    },
    periodTry: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
PluginsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Plugins', PluginsSchema)
