const axios = require('axios')
const pluginsSettings = require('../../models/pluginsSettings')
const url = 'https://api-task.ahuam.com/api';
const _ = require('lodash');
/*******************************
 * Private functions **
 ******************************/

const path = 'ahuam';
const findSettings = () => new Promise((resolve, reject) => {
  pluginsSettings.findOne({'plugin.path': path}, (err, item) => {
    if (!err) {
      resolve(item)
    } else {
      resolve(err)
    }
  })
})

const sendTask = (parent = null, value) => new Promise(async (resolve, reject) => {
  try {
    const {plugin = {}} = await findSettings();
    const keys = plugin.features;
    const instance = axios.create({
      baseURL: url,
      timeout: 1000,
      headers: {'keyMachine': keys.key}
    });
    instance.post(`/hooks/${keys.endpoint}`, {
      ...value,
      ...{
        attachment: _.map(value.attachment, (k) => {
          return {...k, ...{source: k}}
        })
      }
    }).then(function (response) {
      resolve(response.data)
    })
      .catch(function (error) {
        reject({message: error.response.data.errors.msg})
      });
  } catch (error) {
    reject('ERROR_INTERNAL_AHUAM')
  }
})


/*******************************
 * Public functions **
 ******************************/

exports.send_task = async (parent, value) => await sendTask(parent, value);
