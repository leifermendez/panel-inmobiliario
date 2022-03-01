const forms = require('../models/forms')
const documentation = require('../models/documentation')
const db = require('../middleware/db')
const _ = require('lodash')
const numeral = require('numeral')

// eslint-disable-next-line consistent-return
const calcFields = (array) => {
  let result = 0
  for (let i = 0; i < array.length; i++) {
    result += array[i].fieldGroup.length
  }
  return result
}

exports.calculate = async (idAnswer, values = []) => {
  const answer = await db.getItem(idAnswer, documentation)
  const { fields } = await db.getItem(answer.form, forms)
  const result = calcFields(fields)

  // const numberFieldForm = result.length
  const numberFieldAnswer = _.size(values)
  return numeral(numberFieldAnswer).multiply(100).divide(result).format('0')
}
