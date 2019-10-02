const express = require('express') //route control module
const mongoose = require('mongoose') //module for database connection
const cors = require('cors') //module to allow any application to access the backend

const routes = require('./routes')
const server = express()

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-2heqv.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3333)