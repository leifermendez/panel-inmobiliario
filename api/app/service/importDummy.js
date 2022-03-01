const Accommodations = require('../models/accommodation')
const Tasks = require('../models/task')
const Notification = require('../models/notifications')
const Booking = require('../models/booking')
const eventService = require('../service/events')
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

/**
 * Accommodations
 **/

exports.generateAccommodation = async (owner = {}) => {
  const accommodations = {
    "channels": [],
    "status": "unavailable",
    "vote": 5,
    "description": "",
    "gallery": [],
    "address": "Calle de Pepe, 28000 Madrid",
    "addressOptional": "Madrid",
    "state": "Madrid",
    "city": "Madrid, España",
    "country": "ES",
    "dummy": true,
    "location": {
      "type": "Point",
      "coordinates": [
        -79.8918,
        40.0658
      ]
    },
    "name": "PISO 0001"
  }
  const checkDummy = Accommodations.find({dummy: true})
  if (!checkDummy.length) {
    return await Accommodations.create({...accommodations, ...{owner: mongoose.Types.ObjectId(owner)}})
  } else {
    return await checkDummy;
  }
}

/**
 * Task
 **/
exports.generateTask = async (owner = {}, accommodation = {}) => {
  const tasks = {
    "should_start_at": moment().subtract(2, 'day').startOf('day').toDate(),
    "should_end_at": moment().subtract(2, 'day').endOf('day').toDate(),
    "status": "pending",
    "attachment": [],
    "categories": [],
    "seen": [],
    "users_subscriptions": [],
    "tags": [],
    "binnacle": [],
    "dummy": true,
    owner: mongoose.Types.ObjectId(owner),
    "accommodation": {
      "_id": mongoose.Types.ObjectId(accommodation),
      "owner": mongoose.Types.ObjectId(owner)
    },
    "title": "Traslado VIP",
    "observation": "El huésped pidió un traslado en un coche grande donde entren todas sus maletas, con dirección Barajas",
    "comments": [
      {
        "dateCreate" : moment().toDate(),
        "user" : {
          "role" : "user",
          "verified" : false,
          "name" : "test11@test11.com",
          "email" : "test11@test11.com",
          "verification" : "c4a720ad-98fd-4dea-8d88-861265a0016d",
          "stepper" : [],
        },
        "comment" : "<p>Ya todo está preparado y listo para la búsqueda y trasladó de forma segura. ¡Buen viaje! 😎😎</p>"
      }
    ]
  }

  const checkDummy = Tasks.find({dummy: true})
  if (!checkDummy.length) {
    const task = await Tasks.create(tasks);
    await eventService.setEvent({...tasks, ...{_id: task._id}}, tasks, 'task')
    return task
  } else {
    return await checkDummy;
  }
}

/**
 * Bookings
 **/
exports.generateBooking = async (owner = {}, accommodation = {}) => {
  const booking = {
    "dummy": true,
    "localizator": "ABC-1234567890",
    "guest": {
      "name": "Jesus Rafael",
      "lastName": "Mendez Crespo",
      "gender": "male",
      "nationality": "Español",
      "phone": "+34888888888",
      "email": "jesus@test.net",
      "language": "es"
    },
    "portal": "Booking",
    "accommodation": {
      "_id": mongoose.Types.ObjectId(accommodation),
      "owner": mongoose.Types.ObjectId(owner)
    },
    "adults": 1,
    "kids": 2,
    "checkIn": moment().add(1, 'day').startOf('day').toDate(),
    "checkOut": moment().add(5, 'days').startOf('day').toDate()
  }

  const checkDummy = Booking.find({dummy: true})
  if (!checkDummy.length) {
    const book = await Booking.create(booking);
    await eventService.setEvent({...booking, ...{_id: book._id}}, booking, 'booking')
    return book
  } else {
    return await checkDummy;
  }
}


/**
 * Notifications
 **/
exports.generateNotification = async (owner = {}) => {
  const notification = {
    "receptor": mongoose.Types.ObjectId(owner),
    "sender": mongoose.Types.ObjectId(owner),
    "seen": false,
    "behavior": "modal",
    "dummy": true,
    "title": "Datos de pruebas importados",
    "body": "El sistema importó la data de pruebas correctamente, comienza a probar la interfaz",
    "event": "<div class='w-100 text-center'><img src='https://media1.giphy.com/media/3oEjHBUwuSGbFS5iAE/giphy.gif?cid=ecf05e47ku3d2ydm01wyac0g5082rsbkbu9l094ba9rgvj6b&rid=giphy.gif'/></div>"
  }
  const checkDummy = Notification.find({dummy: true})
  if (!checkDummy.length) {
    return Notification.create(notification);
  } else {
    return checkDummy
  }

}
