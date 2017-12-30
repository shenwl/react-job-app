import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import appForm from '../../component/appForm/appForm'

@connect(
    state => state.user,
    {login}
)
@appForm
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
    }

    loginHandler() {
        this.props.login(this.props.state)
    }

    register() {
        this.props.history.push('/register')  
    }
    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <List>
                        <InputItem 
                            onChange={v=>this.props.changeHandler('user', v)}
                            placeholder='请输入用户名'></InputItem>
                        <WhiteSpace />
                        <InputItem
                            type='password'
                            onChange={v=>this.props.changeHandler('pwd', v)}
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