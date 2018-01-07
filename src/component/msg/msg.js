import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

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
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLastItem(a).create_time
            const b_last = this.getLastItem(b).create_time
            return b_last - a_last
        })

        return (
            <div>
                <List>
                    {chatList.map(v => {
                        const lastItem = this.getLastItem(v)
                        const targetId = (lastItem.from === userid)? lastItem.to : lastItem.from
                        const unreadNum = v.filter(v=> !v.read && v.to===userid).length

                        const name = this.props.chat.users[targetId].name
                        const avatar = this.props.chat.users[targetId].avatar
                        return (
                            <List key={lastItem._id}>
                                <Item
                                    extra={<Badge text={unreadNum} />}
                                    thumb={require(`../img/${avatar}.png`)}
                                    arrow="horizontal"
                                    onClick={() => {
                                        this.props.history.push(`/chat/${targetId}`)
                                    }}
                                >
                                    {lastItem.content}
                                    <Brief>{name}</Brief>
                                </Item>
                            </List>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default Msg