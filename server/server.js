const express = require('express')
const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017'
mongoose.connect(DB_URL)

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})


app.listen(8081, function() {
    console.log('ojbk,请空中转体720度用电饭煲打开"http://localhost:8081"')
})