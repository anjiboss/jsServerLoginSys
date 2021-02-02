const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValid, loginValid } = require('../validate')

router.post('/register', async (req, res) => {
  const { error } = registerValid(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const emailExist = await User.findOne({ email: req.body.email })
  const salt = await bcrypt.genSalt(10)
  const hashedPwd = await bcrypt.hash(req.body.password, salt)
  if (emailExist) return res.status(400).send('Email Already Exist')
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPwd,
  })
  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (error) {
    res.satus(400).send(error)
  }
})
router.post('/login', async (req, res) => {
  const { error } = loginValid(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email not Exist')
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid Password')
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = router
