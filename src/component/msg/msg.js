import React from 'react'
import { connect } from 'react-redux'

@connect(
    state => state
)
class Msg extends React.Component {
    render() {
        // 根据chatid， 按照聊天用户分组
        const msgGroup = {}
        this.props.chat.chatMsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        console.log(msgGroup)
        return (
            <div>
                <h2>msglist</h2>
            </div>
        )
    }
}

export default Msg