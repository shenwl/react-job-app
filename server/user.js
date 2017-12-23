const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', (req, res) => {
    User.find({}, (err, doc) => {
        return res.json(doc)
    })
})
//login
Router.post('/register', (req, res) => {
    const {user, pwd, type} = req.body
    User.findOne({user:user}, (err, doc) => {
        if(doc) {
            return res.json({code: 1, msg: '用户名已存在'})
        }
        User.create({user, pwd: utils.md5(pwd), type}, (err, doc) => {
            if(err) {
                return res.json({code: 1, msg: '数据库出错了'})
            }
            return res.json({code: 0})
        })
    })
})

Router.get('/info', (req, res) => {
    return res.json({code: 1})
})

module.exports = Router