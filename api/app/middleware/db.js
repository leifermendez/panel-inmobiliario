const {
  buildSuccObject,
  buildErrObject,
  itemNotFound,
  isIDGoodFunction
} = require('../middleware/utils')
const mongoose = require('mongoose')
const _ = require('lodash');
const moment = require('moment')
/**
 * Builds sorting
 * @param {string} sort - field to sort from
 * @param {number} order - order for query (1,-1)
 */
const buildSort = (sort, order) => {
  const sortBy = {}
  sortBy[sort] = order
  return sortBy
}

/**
 * Hack for mongoose-paginate, removes 'id' from results
 * @param {Object} result - result object
 */
const cleanPaginationID = (result) => {
  result.docs.map((element) => delete element.id)
  return result
}

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptions = async (req) => {
  return new Promise((resolve) => {
    const order = req.query.order || -1
    const sort = req.query.sort || 'createdAt'
    const sortBy = buildSort(sort, order)
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 15
    const options = {
      sort: sortBy,
      lean: true,
      page,
      limit
    }
    resolve(options)
  })
}

module.exports = {
  /**
   * Checks the query string for filtering records
   * query.filter should be the text to search (string)
   * query.fields should be the fields to search into (array)
   * @param {Object} query - query object
   */
  async checkQueryString(query) {
    return new Promise((resolve, reject) => {
      try {
        if (
          typeof query.filter !== 'undefined' &&
          typeof query.fields !== 'undefined'
        ) {
          const data = {
            $or: []
          }
          const array = []
          // Takes fields param and builds an array by splitting with ','
          const arrayFields = query.fields.split(',')
          // Adds SQL Like %word% with regex
          arrayFields.map((item) => {
            /**
             * Match by ID Object
             */
            if (mongoose.Types.ObjectId.isValid(query.filter)) {
              array.push({
                [item]: {
                  $eq: mongoose.Types.ObjectId(query.filter)
                }
              })
            } else {
              array.push({
                [item]: {
                  $regex: new RegExp(query.filter, 'i')
                }
              })
            }

          })
          // Puts array result in data
          data.$or = array
          resolve(data)
        } else {
          resolve({})
        }
      } catch (err) {
        console.log(err.message)
        reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
      }
    })
  },
  async updateItemOne(query, model, req) {
    return new Promise((resolve, reject) => {
      model.findOneAndUpdate(
        query,
        req, {
          new: true,
          runValidators: true
        },
        (err, item) => {
          itemNotFound(err, item, reject, 'NOT_FOUND')
          resolve(item)
        }
      )
    })
  },
  /**
   * Gets items from database
   * @param {Object} req - request object
   * @param {Object} query - query object
   */
  async getItems(req, model, query) {
    const options = await listInitOptions(req)
    return new Promise((resolve, reject) => {
      model.paginate(query, options, (err, items) => {
        if (err) {
          reject(buildErrObject(422, err.message))
        }
        resolve(cleanPaginationID(items))
      })
    })
  },

  /**
   * Gets item from database by id
   * @param {string} id - item id
   */
  async getItem(id, model) {
    return new Promise((resolve, reject) => {
      isIDGoodFunction(id).then(res => {
        model.findById(id, (err, item) => {
          itemNotFound(err, item, reject, 'NOT_FOUND')
          resolve(item)
        })
      }).catch(err => {
        model.findOne({slug: id}, (err, item) => {
          itemNotFound(err, item, reject, 'NOT_FOUND')
          resolve(item)
        })
      })

    })
  },
  async getItemQueryWithOutTenant(query, model, error = 'NOT_FOUND_PLUGIN') {
    return new Promise((resolve, reject) => {
      model.findOne(query, (err, item) => {
        itemNotFound(err, item, reject, error)
        resolve(item)
      })
    })
  },
  async getItemByQuery(query, model, error = 'NOT_FOUND_PLUGIN') {
    return new Promise((resolve, reject) => {
      model.findOne(query, (err, item) => {
        itemNotFound(err, item, reject, error)
        resolve(item)
      })
    })
  },
  async getItemAggregate(aggregate, model) {
    return new Promise((resolve, reject) => {
      model.aggregate(aggregate, (err, item) => {
        itemNotFound(err, _.first(item), reject, 'NOT_FOUND')
        resolve(_.first(item))
      })

    })
  },
  /**
   * Check By User or Admin
   */
  checkByRol(user = {}, query) {
    console.log('-->', query)
    // query.push({'$and': {owner: user.id}})
    return query
  },
  /**
   * Creates a new item in database
   * @param {Object} req - request object
   */
  async createItem(req, model, aggregate = null) {
    return new Promise((resolve, reject) => {
      if (!aggregate) {
        model.create(req, (err, item) => {
          if (err) {
            reject(buildErrObject(422, err.message))
          }
          resolve(item)
        })
      } else {
        model.create(req, async (err, item) => {
          if (err) {
            reject(buildErrObject(422, err.message))
          }
          item = await this.getItemAggregate(aggregate(model, {_id: item._id}), model)
          resolve(item)
        })

      }

    })
  },

  /**
   * Updates an item in database by id
   * @param {string} id - item id
   * @param {Object} req - request object
   */
  async updateItem(id, model, req) {
    return new Promise((resolve, reject) => {
      model.findByIdAndUpdate(
        id,
        req,
        {
          new: true,
          runValidators: true
        },
        (err, item) => {
          itemNotFound(err, item, reject, 'NOT_FOUND')
          resolve(item)
        }
      )
    })
  },

  /**
   * Deletes an item from database by id
   * @param {string} id - id of item
   */
  async deleteItem(id, model) {
    return new Promise((resolve, reject) => {
      model.findByIdAndRemove(id, (err, item) => {
        itemNotFound(err, item, reject, 'NOT_FOUND')
        resolve(buildSuccObject('DELETED'))
      })
    })
  },
  getLookFormsLanding(model, query = {}) {
    return model.aggregate([
      {
        $lookup: {
          from: 'forms',
          let: {idForm: '$forms'},
          pipeline: [
            {$match: {$expr: {'$in': ['$_id', '$$idForm']}}}
          ],
          as: 'forms'
        }
      },
      // {$unwind: '$form'},
      {
        $match: query
      }
    ])
  },
  getLookAccommodation(model, query = {}, owner = {}) {
    if (owner && !owner.role.includes('admin')) {
      query = {
        ...query,
        ...{
          $and: [
            {owner: mongoose.Types.ObjectId(owner._id)}
          ]
        }
      }
    }
    return model.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: 'users',
          let: {
            idOwner: "$owner",
          },
          pipeline: [
            {
              $match:
                {
                  $expr:
                    {
                      $and: [{$eq: ["$$idOwner", "$_id"]}]
                    }
                }
            },
            {
              $project: {
                _id: 1,
                name:1,
                lastName:1
              }
            }
          ],
          as: 'owner'
        }
      },
      {$unwind: '$owner'}
    ])
  },
  getLookTask(model, query = {}, owner = {}) {
    if (owner && !owner.role.includes('admin')) {
      query = {
        ...query,
        ...{
          $and: [
            {owner: mongoose.Types.ObjectId(owner._id)}
          ]
        }
      }
    }
    return model.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: 'accommodations',
          let: {
            idAcc: "$accommodation",
          },
          pipeline: [
            {
              $match:
                {
                  $expr:
                    {
                      $and: [{$eq: ["$$idAcc", "$_id"]}]
                    }
                }
            },
            {
              $project: {
                _id: 1,
                name: 1,
                status: 1,
                address: 1,
                city: 1,
                state: 1,
                location: 1
              }
            }
          ],
          as: 'accommodation'
        }
      },
      {
        $unwind: "$accommodation"
      }
    ])
  },
  getLookSearch(model, query = {}, owner = {}) {
    if (owner && !owner.role.includes('admin')) {
      query = {
        ...query,
        ...{
          $and: [
            {owner: mongoose.Types.ObjectId(owner._id)}
          ]
        }
      }
    }
    return model.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: 'accommodations',
          let: {
            idAcc: "$accommodation",
          },
          pipeline: [
            {
              $match:
                {
                  $expr:
                    {
                      $and: [{$eq: ["$$idAcc", "$_id"]}]
                    }
                }
            },
            {
              $project: {
                _id: 1,
                name: 1,
                status: 1,
                address: 1,
                city: 1,
                state: 1,
                location: 1
              }
            }
          ],
          as: 'accommodation'
        }
      },
    ])
  },
  getLookEvents(model, query = {}, owner = {}) {
    if (owner && !owner.role.includes('admin')) {
      query = {
        ...query,
        ...{
          $and: [
            {owner: mongoose.Types.ObjectId(owner._id)}
          ]
        }
      }
    }
    return model.aggregate([
      {
        $match: query
      }
    ])
  },
  getLookNotifications(model, query = {}, owner = {}) {
    if (owner && !owner.role.includes('admin')) {
      query = {
        ...query,
        ...{
          $and: [
            {receptor: mongoose.Types.ObjectId(owner._id)}
          ]
        }
      }
    }
    return model.aggregate([
      {
        $match: query
      }
    ])
  },
  getLookTaskSingle(model, query = {}) {
    return [
      {
        $match: query
      },
      {
        $lookup: {
          from: 'accommodations',
          let: {
            idAcc: "$accommodation",
          },
          pipeline: [
            {
              $match:
                {
                  $expr:
                    {
                      $and: [{$eq: ["$$idAcc", "$_id"]}]
                    }
                }
            },
            {
              $project: {
                _id: 1,
                name: 1,
                status: 1,
                address: 1,
                gallery: 1,
                owner: 1,
                city: 1,
                state: 1,
                location: 1
              }
            }
          ],
          as: 'accommodation'
        }
      },
      {
        $unwind: "$accommodation"
      }
    ]
  },
  getLookBookingSingle(model, query = {}) {
    return [
      {
        $match: query
      },
      {
        $lookup: {
          from: 'accommodations',
          let: {
            idAcc: "$accommodation",
          },
          pipeline: [
            {
              $match:
                {
                  $expr:
                    {
                      $and: [{$eq: ["$$idAcc", "$_id"]}]
                    }
                }
            },
            {
              $project: {
                _id: 1,
                name: 1,
                status: 1,
                address: 1,
                gallery: 1,
                owner: 1,
                city: 1,
                state: 1,
                location: 1
              }
            }
          ],
          as: 'accommodation'
        }
      },
      {
        $unwind: "$accommodation"
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          updatedAt: 1,
          portal: 1,
          adults: 1,
          kids: 1,
          checkIn: 1,
          checkOut: 1,
          localizator: 1,
          guest: "$guest",
          accommodation: "$accommodation",
          nights: {
            $trunc: {
              $divide: [{$subtract: ['$checkOut', '$checkIn']}, 1000 * 60 * 60 * 24]
            }
          }
        }
      }
    ]
  },
  getLookDocs(model, query = {}, owner = {}) {
    let moreQuery = []
    if (owner && !owner.role.includes('admin')) {
      moreQuery = [
        {$eq: [mongoose.Types.ObjectId(owner._id), "$owner"]}
      ]
    }

    return model.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: 'forms',
          let: {
            idForm: "$form",
            idAcc: "$accommodation",
          },
          pipeline: [
            {
              $lookup: {
                from: 'accommodations',
                pipeline: [
                  {
                    $match:
                      {
                        $expr:
                          {
                            $and: [{$eq: ["$$idAcc", "$_id"]}]
                          }
                      }
                  },
                  {
                    $project: {
                      _id: 1
                    }
                  }
                ],
                as: 'accommodation'
              }
            },
            {$unwind: '$accommodation'}
          ],
          as: 'forms'
        },
      },
      {
        $lookup: {
          from: 'accommodations',
          let: {
            idAcc: "$accommodation",
          },
          pipeline: [
            {
              $match:
                {
                  $expr:
                    {
                      $and: [].concat({$eq: ["$$idAcc", "$_id"]}).concat(moreQuery),

                    }
                }
            },
            {
              $lookup: {
                from: 'users',
                let: {
                  idOwner: "$owner",
                },
                pipeline: [
                  {
                    $match:
                      {
                        $expr:
                          {
                            $and: [{$eq: ["$$idOwner", "$_id"]}]
                          }
                      }
                  },
                  {
                    $project: {
                      _id: 1,
                      name:1,
                      lastName:1
                    }
                  }
                ],
                as: 'owner'
              }
            },
            {$unwind: '$owner'}
          ],
          as: 'accommodation'
        }
      },
      {
        $lookup: {
          from: 'forms',
          let: {idForm1: '$form'},
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {$eq: ["$$idForm1", "$_id"]}
                  ]
                }
              }
            }
          ],
          as: 'formSingle'
        }
      },
      {$unwind: '$formSingle'},
      {$unwind: '$accommodation'},
      {
        $project: {forms: 0}
      }
    ])
  },
  getLookBookings(model, query = {}, owner = {}) {
    let moreQuery = [{$eq: ["$$idAcc", "$_id"]}]
    if (owner && !owner.role.includes('admin')) {
      moreQuery = [
        {$eq: [mongoose.Types.ObjectId(owner._id), "$owner"]},
        {$eq: ["$$idAcc", "$_id"]}
      ]
    }

    return model.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: 'accommodations',
          let: {
            idAcc: "$accommodation",
          },
          pipeline: [
            {
              $match:
                {
                  $expr:
                    {
                      $and: moreQuery
                    }
                }
            },
            {
              $project: {
                _id: 1,
                name: 1,
                status: 1,
                address: 1,
                city: 1,
                state: 1,
                location: 1
              }
            }
          ],
          as: 'accommodation'
        }
      },
      {$unwind: '$accommodation'}
    ])
  },
  getSettlement(model, query = {}, id = '') {
    query = {
      ...query,
      ...{
        $and: [{ accommodation: mongoose.Types.ObjectId(id) }]
      }
    }
    return model.aggregate([
      {
        $match: query
      }
    ])
  },
  async getItemsAggregate(req, model, aggregate) {
    const options = await listInitOptions(req)
    return new Promise((resolve, reject) => {
      model.aggregatePaginate(aggregate, options, (err, items) => {
        if (err) {
          reject(buildErrObject(422, err.message))
        }
        resolve(cleanPaginationID(items))
      })
    })
  },
}
