const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const model = require('./model')
const Chat = model.getModel('chat')

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    // console.log('user login')
    socket.on('sendMsg', (data) => {
        const {from, to, msg} = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content: msg}, (err, doc) => {
            io.emit('receiveMsg', Object.assign({}, doc._doc))
        })
    })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(8081, () => {
    console.log('ojbk,请空中转体720度用电饭煲打开"http://localhost:8081"')
})