const express = require('express')
const socketIo = require('socket.io')
const http = require('http')

const port = 9000
const app = express()

const server = http.createServer(app)

const io = socketIo(server)

const fakeData = [
    {
        streamer: "Bob", 
        event: "100M"
    },
    {
        streamer: "Bill", 
        event: "200M"
    },
    {
        streamer: "Boris", 
        event: "500M"
    }
]

app.get('/', (req, res) => {
    res.json(fakeData)
})

io.on('connection', socket => {
    console.log('somebody is connected');
    socket.on('event', (data) => {
        socket.emit('event', fakeData[0].streamer)
    })
})


server.listen(process.env.PORT || 9000)


// app.listen(port, () => console.log('listening'))
