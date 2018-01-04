import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { getMsgList, sendMsg, receiveMsg } from '../../redux/chat.redux'

const socket = io('ws://localhost:8081')

@connect(
    state => state,
    {getMsgList, sendMsg, receiveMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', msg: []}
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentDidMount() {
        if(!this.props.chat.chatMsg.length) {
            this.props.getMsgList()
            this.props.receiveMsg()
        }
    }

    submitHandler() {
        this.setState({text: ''})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({ text: '' })
    }

    render() {
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if(!users[userid]) {
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}>
                    {users[userid].name}
                </NavBar>

                {this.props.chat.chatMsg.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === userid? (
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item
                                extra={<img src={avatar} />}
                                className='chat-me'>{v.content}</Item>
                        </List>
                    )
                })}
            
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => {
                                this.setState({ text: v })
                            }}
                            extra={<span onClick={this.submitHandler}> 发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div> 
        )
    }
}

export default Chat