const WebHooks = require('node-webhooks')
const model = require('../models/webhoooks')
const _ = require('lodash');

const loadWebHook = async () => {
  const data = await model.find({})
  return _.mapValues(_.keyBy(data, 'name'), (i) => i.endpoint)
}

const getHeader = async (name) => {
  const dataHeader = await model.findOne({name});
  return dataHeader.headers || {}
}

const getTriggers = (mode) => {
  return new Promise((resolve, reject) => {
    model.find({mode}, (err, items) => {
      if (!err) {
        resolve(items)
      } else {
        resolve([])
      }
    });
  })
}

const emitEvents = (webHooks, trigger, instanceModel) => {
  const emitter = webHooks.getEmitter();

  /**
   * Emit with event success
   */
  emitter.on('*.success', function (shortname, statusCode, body) {
    if (instanceModel) {
      const {model, query} = instanceModel;
      const bodyRaw = {
        [`customData.${trigger.source}`]: JSON.parse(body)._id
      }

      model.findOneAndUpdate(
        query,
        bodyRaw,
        {
          new: true,
          upsert: true,
          runValidators: true
        }, (err, res) => {
        })
    }
    console.log('Success on trigger webHook' + shortname + 'with status code', statusCode, 'and body', body)
  })


  /**
   * Emit with event failed
   */
  // console.log(data)
  emitter.on('*.failure', function (shortname, statusCode, body) {
    console.error('Error on trigger webHook' + shortname + 'with status code', statusCode, 'and body', body)
  })

}

async function webHookInstance(mode = '', data = {}, instanceModel = null) {
  const webHooks = new WebHooks({
    db: await loadWebHook(),
    httpSuccessCodes: [200, 201, 202, 203, 204], //optional success http status codes
  })

  const triggers = await getTriggers(mode);
  _.forEach(triggers, async (t) => {
    data = JSON.parse(JSON.stringify(data))
    delete data._id
    if (data.customData) {
      data.id = data.customData[t.source] || null;
    }
    webHooks.trigger(t.name, data, await getHeader(t.name))
    emitEvents(webHooks, t, instanceModel, data)
  })
}


module.exports = {
  webHookInstance: webHookInstance
}
