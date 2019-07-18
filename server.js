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
        state: 'loader',
        speech: 'Cette application vous permet de rejoindre un live sportif commenté par un tiers, ou de vous glisser vous-même dans la peau d\'un commentateur.'
    }
    io.emit('event', data)
    res.json(data)
})

const streamList = [
    [
        {
            name: 'Luciole',
            src: 'assets/img/luciole.jpg',
            online: true
        },
        {
            name: 'Cyprien',
            src: 'assets/img/cyprien.jpg',
            online: true
        },
        {
            name: 'Mister V',
            src: 'assets/img/misterv.jpg',
            online: true
        }
    ],
    [
        {
            name: 'Squeezie',
            src: 'assets/img/squeezie.jpg',
            online: true
        },
        {
            name: 'Natoo',
            src: 'assets/img/natoo.jpg',
            online: true
        },
        {
            name: 'Norman',
            src: 'assets/img/norman.jpg',
            online: true
        }
    ],
    [
        {
            name: 'Seb La Frite',
            src: 'assets/img/seb.jpg',
            online: true
        },
        {
            name: 'Tibo In Shape',
            src: 'assets/img/tibo.jpg',
            online: true
        },
        {
            name: 'Hugo Tout Seul',
            src: 'assets/img/hugo.jpg',
            online: true
        }
    ]
]

let id = 0
app.get('/stream', (req, res) => {
    const data = {
        state: 'home',
        data: {
            streamers: streamList[id],
            id
        },
        speech: `Choisissez un streamer parmi : ${streamList[id][0].name}, ${streamList[id][1].name}, ou ${streamList[id][2].name}`
    }
    io.emit('event', data)
    if(id == 2) {
        id = 0
    } else {
        id++
    }
    res.json(data)
})

app.get('/media/actions/:action', (req, res) => {
    const name = req.params.action
    let state = 'action'
    if (name === 'repars' || name === 'continue' || name === 'remets' || name === 'reprends' || name === 'joue' || name === 'jouer' || name === 'play' || name === 'lecture') {
        action = 'play'
    } else if (name === 'arrête' || name === 'pause') {
        action = 'pause'
    } else if (name === 'stop') {
        action = 'stop'
    } else {
        action = 'error'
    }
    
    const data = {
        state,
        action: action,
        data: name,
        speech: ''
    }
    io.emit('event', data)
    res.json(data)
})

app.get('/media/:streamer', (req, res) => {
    const name = req.params.streamer
    const nameConcat = name.trim()
    const data = {
        state: 'video',
        data: {
            name: name,
            src: `${nameConcat.toLowerCase()}.jpg`,
            action: 'play'
        },
        speech: `Entendu. Voici le stream de ${name}`
    }
    io.emit('event', data)
    res.json(data)
})

app.get('/media/:streamer/:action', (req, res) => {
    const name = req.params.streamer
    const action = req.params.action
    const data = {
        state: 'video',
        action: action,
        data: 'video.mp4',
        speech: `Entendu. Voici le stream de ${name}`
    }
    io.emit('event', data)
    res.json(data)
})

app.get('/search/:streamer', (req, res) => {
    const name = req.params.streamer
    

    if(result.online) {
        console.log(result);
    }
    
    const data = {
        state: 'video',
        data: {
            name: name,
            src: `${name}.png`,
        },
        speech: `Entendu. Voici le stream de ${name}`
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
