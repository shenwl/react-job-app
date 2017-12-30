import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import appForm from '../../component/appForm/appForm'

@connect(
    state => state.user,
    {register}
)
@appForm
class Register extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.changeHandler('type', 'genius')
    }

    registerHandler() {
        this.props.register(this.props.state)
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem 
                            onChange={v=>this.props.changeHandler('user', v)}
                            placeholder='用户名'></InputItem>
                        <WhiteSpace />
                        <InputItem
                            type='password'
                            onChange={v=>this.props.changeHandler('pwd', v)}
                            placeholder='密码'></InputItem>
                        <WhiteSpace />
                        <InputItem 
                            type='password'
                            onChange={v=>this.props.changeHandler('repeatPwd', v)}
                            placeholder='确认密码'></InputItem>
                        <WhiteSpace />
                        <WhiteSpace />
                        <RadioItem 
                            checked={this.props.state.type==='genius'}
                            onChange={() => this.props.changeHandler('type', 'genius')}>
                            求职者
                        </RadioItem>
                        <RadioItem 
                            checked={this.props.state.type==='boss'}
                            onChange={() => this.props.changeHandler('type', 'boss')}>
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