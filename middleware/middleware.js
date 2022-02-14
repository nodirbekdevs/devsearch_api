const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const Routes = require('./../routes/main')

const middleware = (app) => {
  app.use(cors())
  app.options('*', cors())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.get('env') === 'development' ? app.use(morgan('dev')) : app.use(helmet())
  app.use(compression())
  app.use('/uploads', express.static('uploads'))
  app.use(`/api`, Routes)
}

module.exports = middleware
