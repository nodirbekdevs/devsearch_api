const express = require('express')
const authRoutes = require('./authRoutes')
const messageRoutes = require('./messageRoutes')
const projectRoutes = require('./projectRoutes')
const reviewRoutes = require('./reviewRoutes')
const skillRoutes = require('./skillRoutes')
const userRoutes = require('./userRoutes')

const main = express();

main.use('/auth', authRoutes)
main.use('/message', messageRoutes)
main.use('/project', projectRoutes)
main.use('/review', reviewRoutes)
main.use('/skill', skillRoutes)
main.use('/user', userRoutes)

module.exports = main
