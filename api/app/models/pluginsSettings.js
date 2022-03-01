const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PluginSettingSchema = new mongoose.Schema(
  {
    plugin: {
      type: Object,
      required: true
    },
    status: {
      type: String,
      enum: ['enabled', 'disabled'],
      default: 'enabled'
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
PluginSettingSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('PluginsSettings', PluginSettingSchema)
