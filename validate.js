const Joi = require('@hapi/joi')

const registerValid = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(6).max(255),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  })
  return ({ error } = schema.validate(data))
}
const loginValid = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  })
  return ({ error } = schema.validate(data))
}

module.exports.registerValid = registerValid
module.exports.loginValid = loginValid
