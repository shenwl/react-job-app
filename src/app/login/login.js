import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    {login}
)
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
    }

    changeHandler(key, value) {
        this.setState({
            [key]: value
        })
    }

    loginHandler() {
        this.props.login(this.state)
    }

    register() {
        this.props.history.push('/register')  
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <List>
                        <InputItem 
                            onChange={v=>this.changeHandler('user', v)}
                            placeholder='请输入用户名'></InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={v=>this.changeHandler('pwd', v)}
                            placeholder='请输入密码'></InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button onClick={this.loginHandler} type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login