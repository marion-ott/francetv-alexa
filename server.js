const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const cors = require('cors')

const port = 9000
const app = express()
app.use(cors())

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
    socket.on('event', (data) => {
        socket.emit('event', fakeData)
    })
})


server.listen(process.env.PORT || 9000)


// app.listen(port, () => console.log('listening'))
