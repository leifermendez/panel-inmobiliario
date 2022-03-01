const _ = require('lodash');
const changesets = require('diff-json');
const moment = require('moment')

exports.checkJson = (entrance, output, author = null) => {
  try {
    const diff = changesets.diff(
      JSON.parse(JSON.stringify(entrance)),
      JSON.parse(JSON.stringify(output)))

    return _.map(diff, (i) => {
      return {
        ...i, ...{
          author: {_id: author._id, name: author.name},
          updatedAt: moment().toDate()
        }
      }
    })
  } catch (e) {
    return []
  }

}
