import React from 'react'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { getMsgList, sendMsg, receiveMsg } from '../../redux/chat.redux'

const socket = io('ws://localhost:8081')

@connect(
    state => state,
    { getMsgList, sendMsg, receiveMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', msg: []}
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentDidMount() {
        this.props.getMsgList()
        this.props.receiveMsg()
        // socket.on('receiveMsg', data => {
        //     this.setState({
        //         msg: [this.state.msg, data.text]
        //     })
        // })
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
        return (
            <div>
                {this.state.msg.map(v => {
                    return <p key={v}>{v}</p>
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