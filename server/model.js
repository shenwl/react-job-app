const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/job-chat'
mongoose.connect(DB_URL)

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        'avatar': {type: String},
        //个人简介
        'desc': {type: String},
        //想找的职位
        'title': {type: String},
        //if boss
        'company': {type: String},
        'money': {type: String}
    },
    chat: {

    }
}

//create models
for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}