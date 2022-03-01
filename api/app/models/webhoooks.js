const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const WebHooksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    source: {
      type: String,
      required: true
    },
    endpoint: {
      type: Array,
      required: true,
      default: []
    },
    headers: {
      type: Object,
      required: false
    },
    mode: {
      type: String,
      enum: ['addTask', 'editTask', 'deleteTask', 'addTaskComment', 'editTaskComment', 'deleteTaskComment']
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)
WebHooksSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('WebHooks', WebHooksSchema)
