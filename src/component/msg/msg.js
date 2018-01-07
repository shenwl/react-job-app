import React from 'react'
import { connect } from 'react-redux'
import { List } from 'antd-mobile'

@connect(
    state => state
)
class Msg extends React.Component {
    getLastItem(arr) {
        return arr[arr.length - 1]
    }
    render() {
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        // 根据chatid， 按照聊天用户分组
        const msgGroup = {}
        this.props.chat.chatMsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup)
        return (
            <div>
                <List>
                    {chatList.map(v => {
                        const lastItem = this.getLastItem(v)
                        const targetId = (lastItem.from === userid)? lastItem.to : lastItem.from
                        
                        const name = this.props.chat.users[targetId].name
                        const avatar = this.props.chat.users[targetId].avatar
                        return (
                            <Item
                                thumb={require(`../img/${avatar}.png`)}
                                key={lastItem._id}
                            >
                                {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default Msg