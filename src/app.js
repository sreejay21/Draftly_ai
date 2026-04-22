const express = require('express')
const app = express()

const routes = require('./routes')
const swaggerApp = require('./swagger')

app.use('/', swaggerApp)

app.use(express.json())
app.use('/api', routes)

module.exports = app