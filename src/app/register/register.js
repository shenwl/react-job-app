import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'genius'  //or boss
        }
    }

    register() {
      this.props.history.push('/register')  
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem placeholder='请输入用户名'></InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='请输入密码'></InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='请确认密码'></InputItem>
                        <WhiteSpace />
                        <WhiteSpace />
                        <RadioItem checked={this.state.type==='genius'}>
                            求职者
                        </RadioItem>
                        <RadioItem checked={this.state.type==='boss'}>
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register