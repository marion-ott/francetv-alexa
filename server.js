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
            name: 'Norman',
            src: 'assets/img/norman.png',
            online: true
        }
    ],
    [
        {
            name: 'Cyprien',
            src: 'assets/img/cyprien.jpg',
            online: true
        },
        {
            name: 'Luciole',
            src: 'assets/img/luciole.jpg',
            online: true
        },
        {
            name: 'Norman',
            src: 'assets/img/norman.png',
            online: true
        }
    ],
    [
        {
            name: 'Norman',
            src: 'assets/img/norman.png',
            online: true
        },
        {
            name: 'Cyprien',
            src: 'assets/img/cyprien.jpg',
            online: true
        },
        {
            name: 'Luciole',
            src: 'assets/img/luciole.jpg',
            online: true
        }
    ]
]

app.get('/stream', (req, res) => {
    const data = {
        state: 'streamList',
        data: streamList,
        speech: `Choisis un streamer parmi : ${streamList[id][0].name}, ${streamList[id][1].name}, ou ${streamList[id][2].name}`
    }
    io.emit('event', data)
    res.json(data)
})

app.get('/media/actions/:action', (req, res) => {
    const name = req.params.action
    let state = ''
    if (name === 'repars' || name === 'continue' || name === 'remets' || name === 'reprends' || name === 'joue' || name === 'jouer' || name === 'play') {
        state = 'play'
    } else if (name === 'arrête' || name === 'pause') {
        state = 'pause'
    } else if (name === 'stop') {
        state = 'stop'
    } else {
        state = 'error'
    }
    const data = {
        state,
        data: name,
        speech: state.charAt(0).toUpperCase() + state.substr(1) + '.'
    }
    io.emit('event', data)
    res.json(data)
})

app.get('/media/:streamer', (req, res) => {
    const name = req.params.streamer
    const data = {
        state: 'video',
        data: 'video.mp4',
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
    let result = streamList.find(obj => {
        return obj.name.toLowerCase() === name.toLowerCase()
    })

    if(result.online) {
        console.log(result);
    }
    
    const data = {
        state: 'video',
        data: 'video.mp4',
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
