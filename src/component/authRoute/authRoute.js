import React from 'react'
import axios from 'axios'

class AuthRoute extends React.Component {
    componentDidMount() {
        //获取用户信息
        axios.get('/user/info')
        //是否登录，当前url，login url不需要跳转
        //用户type（身份）
        //用户是否完善信息（选择头像，个人简介）
    }
    render() {
        return
    }
}

export default AuthRoute