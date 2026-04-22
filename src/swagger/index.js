const express = require('express')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const swaggerSchemas = require('./schemas')
const swaggerExamples = require('./swaggerExamples')

const swaggerApp = express()

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Draftly API',
      version: '1.0.0',
      description: 'AI Email Assistant API'
    },
    servers: [
      {
        url: process.env.API_BASE_PATH || 'http://localhost:3000',
        description: 'Server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      },
      schemas: swaggerSchemas,
      examples: swaggerExamples
    }
  },
  apis: [path.join(__dirname, '..', 'routes/*.js')]
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

swaggerApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = swaggerApp