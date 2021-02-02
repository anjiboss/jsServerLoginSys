const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = function (req, res, next) {
  const token = req.header('auth-token')
  if (!token) return res.status(400).send('Access Denied')
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
  } catch {
    res.status(400).send('Invalid Token')
  }
  next()
}
