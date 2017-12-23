import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }

    register() {
        console.log(this.props)
        this.props.history.push('/register')  
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem placeholder='请输入用户名'></InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='请输入密码'></InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type='primary'>登陆</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login