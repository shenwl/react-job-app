const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

//md5
function md5Pwd(pwd) {
    const salt = 'dsada~~j_14~21_vklfdmo_94839_asd'
    return utils.md5(utils.md5(pwd+salt))
}

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
        User.create({user, pwd: md5Pwd(pwd), type}, (err, doc) => {
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