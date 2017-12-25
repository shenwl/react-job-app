import React from 'react'
import { InputItem, WhiteSpace, Button, NavBar, TextareaItem, WingBlank } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'

@connect(
    state => state.user,
    {update}
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: '',
            title: '',
            company: '',
            money: '',
            desc: ''
        }
    }
    onChangeHandler(key, val) {
        this.setState({
            [key]: val
        })
    }
    render() {
        return (
            <div>
                <NavBar mode="dark">BOSS完善信息页</NavBar>
                <AvatarSelector
                    selectAvatar={(imgName) => {
                        this.setState({
                            avatar: imgName
                        })
                    }}
                ></AvatarSelector>
                <WhiteSpace />
                <InputItem onChange={(v) => this.onChangeHandler('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(v) => this.onChangeHandler('company', v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={(v) => this.onChangeHandler('money', v)}>
                    薪资范围
                </InputItem>
                <TextareaItem 
                    onChange={(v) => this.onChangeHandler('desc', v)}
                    rows='3'
                    autoHeight='true'
                    title='职位要求'>
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

export default BossInfo