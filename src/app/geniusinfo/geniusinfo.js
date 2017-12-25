import React from 'react'
import { InputItem, WhiteSpace, Button, NavBar, TextareaItem, WingBlank } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: '',
            desc: ''
        }
    }
    onChangeHandler(key, val) {
        this.setState({
            [key]: val
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                { redirect && redirect !== path ? <Redirect to={redirect}></Redirect> : null}
                <NavBar mode="dark">求职者完善信息页</NavBar>
                <AvatarSelector
                    selectAvatar={(imgName) => {
                        this.setState({
                            avatar: imgName
                        })
                    }}
                ></AvatarSelector>
                <WhiteSpace />
                <InputItem onChange={(v) => this.onChangeHandler('title', v)}>
                    求职岗位
                </InputItem>
                <TextareaItem 
                    onChange={(v) => this.onChangeHandler('desc', v)}
                    rows='3'
                    autoHeight='true'
                    title='个人简介'>
                </TextareaItem>
                <WingBlank>
                    <Button
                        onClick={() => {
                            this.props.update(this.state)
                        }}
                        type='primary'>保存</Button>
                </WingBlank>
            </div>
            
        )
    }
}

export default GeniusInfo
