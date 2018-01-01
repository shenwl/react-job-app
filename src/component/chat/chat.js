import React from 'react'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { getMsgList } from '../../redux/chat.redux'

const socket = io('ws://localhost:8081')

@connect(
    state => state,
    {getMsgList}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', msg: []}
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        this.props.getMsgList()
        // socket.on('receiveMsg', data => {
        //     this.setState({
        //         msg: [this.state.msg, data.text]
        //     })
        // })
    }

    submitHandler() {
        socket.emit('sendMsg', {text: this.state.text})
        this.setState({text: ''})
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