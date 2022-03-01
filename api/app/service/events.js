const events = require('../models/events')
const db = require('../middleware/db')
const _ = require('lodash');
const webHook = require('./webhook');
const moment = require('moment');
const mongoose = require('mongoose');
const i18n = require('i18n')


/**
 * Create event from Booking trigger
 * @param data
 * @returns {Promise<void>}
 */
const createFromBooking = async (data = {}) => {
  const title = await i18n.__('eventService.fromBooking.TITLE',
    moment(data.checkIn).format('DD/MM'),
    moment(data.checkOut).format('DD/MM')
  )

  const observation = await i18n.__('eventService.fromBooking.OBSERVATION',
    `${data.guest.name} ${data.guest.lastName}`,
    `${data.accommodation.name}`,
  )
  const req = {
    start: data.checkIn,
    end: data.checkOut,
    title,
    allDay: true,
    observation,
    color: 'green',
    type: 'booking',
    behavior: {
      mode: 'router',
      router: `/booking/${data._id}`,
      target: `${data._id}`
    },
    customData: {},
    owner: mongoose.Types.ObjectId(data.accommodation.owner)
  }
  await db.createItem(req, events)
  // await webHook.webHookInstance('sendTask', data)
  // await pluginAhuam.send_task(null, data)
}

/**
 * Create event from Task trigger
 * @param data
 * @returns {Promise<void>}
 */

const createFromTask = async (data = {}) => {

  const req = {
    start: data.should_start_at,
    end: data.should_end_at,
    title: data.title,
    allDay: true,
    observation: data.observation,
    type: 'task',
    color: 'blue',
    behavior: {
      mode: 'router',
      router: `/task/${data._id}`,
      target: `${data._id}`
    },
    customData: {},
    owner: mongoose.Types.ObjectId(data.accommodation.owner)
  }
  // console.log(data)
  await db.createItem(req, events)


}

exports.setEvent = async (set = false, req = {}, from = '', language = 'en') => {
  if (set) {
    i18n.setLocale(language)
    if (from === 'booking') {
      await createFromBooking(set)
    }
    if (from === 'task') {
      await createFromTask(set)
    }
  }
}
