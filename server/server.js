const express = require('express')
const userRouter = require('./user')

const app = express()

app.use('/user', userRouter)

app.listen(8081, () => {
    console.log('ojbk,请空中转体720度用电饭煲打开"http://localhost:8081"')
})