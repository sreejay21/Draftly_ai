const express = require('express')
const app = express()
const cors = require('cors')
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


const routes = require('./routes')
const swaggerApp = require('./swagger')

app.use('/', swaggerApp)

app.use(express.json())
app.use('/api', routes)

module.exports = app