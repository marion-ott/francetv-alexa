const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const cors = require('cors')
const https = require('https')
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
    io.emit('event', fakeData)
    res.json(fakeData)
})

io.on('connection', socket => {
    console.log("someone is connected");
    
    io.on('event', (data) => {
        console.log("action launched");
        
        io.emit('event', fakeData)
    })
})


server.listen(process.env.PORT || 9000)


// app.listen(port, () => console.log('listening'))
