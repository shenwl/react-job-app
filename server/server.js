const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

app.listen(8081, () => {
    console.log('ojbk,请空中转体720度用电饭煲打开"http://localhost:8081"')
})