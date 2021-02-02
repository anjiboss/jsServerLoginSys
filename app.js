const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/_post')
//connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('Connected')
)

//MiddleWare
app.use(express.json())

//Route MiddleWare
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)

app.listen(3000, () => console.log('START'))
