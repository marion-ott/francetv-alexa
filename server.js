const express = require('express')
const socketIo = require('socket.io')
const http = require('http')

const port = 9000
const app = express()

const server = http.createServer(app)

const io = socketIo(server)


io.on('connection', socket => {
    console.log('somebody is connected');
    socket.on('event', (data) => {
        socket.emit('event', 'plouf')
    })
})


server.listen(process.env.PORT || 9000);


// app.listen(port, () => console.log('listening'))
