import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component {
    componentDidMount() {
        //获取用户信息
        axios.get('/user/info')
            .then(res => {
                if(res.status==200) {
                    if(res.data.code==0) {

                    }else {
                        console.log(this.props.history)
                    }
                    console.log(res.data)
                }
            })
        //是否登录
        //当前url，login url不需要跳转
        //用户type（身份）
        //用户是否完善信息（选择头像，个人简介）
    }
    render() {
        return null
    }
}

export default AuthRoute