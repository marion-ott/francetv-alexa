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


app.get('/', (req, res) => {
    const data = {
        state: 'home',
        speech: 'Cette application vous permet de rejoindre un live sportif commenté par un tiers, ou de vous glisser vous-même dans la peau d\'un commentateur.'
    }
    io.emit('event', data)
    res.json(data)
})


const streamList = [
    [
        {
            name: 'Bill',
            image: 'image.jpg'
        },
        {
            name: 'Bob',
            image: 'image.jpg'
        },
        {
            name: 'Gérard',
            image: 'image.jpg'
        }
    ],
    [
        {
            name: 'Paule',
            image: 'image.jpg'
        },
        {
            name: 'Hélène',
            image: 'image.jpg'
        },
        {
            name: 'Marion',
            image: 'image.jpg'
        }
    ]
]


app.get('/stream/:id', (req, res) => {
    const id = req.params.id
    const data = {
        state: 'streamList',
        data: streamList[id],
        speech: `Choisissez un streamer parmi : ${streamList[id][0].name}, ${streamList[id][1].name}, ou ${streamList[id][2].name}`
    }
    io.emit('event', data)
    res.json(data)
})


app.get('/media/:streamer', (req, res) => {
    const name = req.params.streamer
    const data = {
        state: 'streamList',
        data: 'video.mp4',
        speech: `Voici le stream de ${name}`
    }
    io.emit('event', data)
    res.json(data)
})

io.on('connection', socket => {
    console.log("someone is connected");
    
    // io.on('event', (data) => {
    //     console.log("action launched");
        
    //     io.emit('event', fakeData)
    // })
})


server.listen(process.env.PORT || 9000)


// app.listen(port, () => console.log('listening'))
