import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'

@connect(
    state => state.user,
    {register}
)
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: '',
            repeatPwd: '',
            type: 'genius'  //or boss
        }
    }

    changeHandler(key, value) {
        this.setState({
            [key]: value
        })
    }

    registerHandler() {
        this.props.register(this.state)
        console.log(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem 
                            onChange={v=>this.changeHandler('user', v)}
                            placeholder='用户名'></InputItem>
                        <WhiteSpace />
                        <InputItem
                            type='password'
                            onChange={v=>this.changeHandler('pwd', v)}
                            placeholder='密码'></InputItem>
                        <WhiteSpace />
                        <InputItem 
                            type='password'
                            onChange={v=>this.changeHandler('repeatPwd', v)}
                            placeholder='确认密码'></InputItem>
                        <WhiteSpace />
                        <WhiteSpace />
                        <RadioItem 
                            checked={this.state.type==='genius'}
                            onChange={() => this.changeHandler('type', 'genius')}>
                            求职者
                        </RadioItem>
                        <RadioItem 
                            checked={this.state.type==='boss'}
                            onChange={() => this.changeHandler('type', 'boss')}>
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type='primary' onClick={() => this.registerHandler()}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register