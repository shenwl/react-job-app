import React from 'react'
import { connect } from 'react-redux'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
    state => state.chatuser,
    {getUserList}
)
class Boss extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
       this.props.getUserList('genius')
    }
    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.props.userlist.map(v => (
                    v.avatar ? 
                    <Card key={v._id}>
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}>
                        </Header>
                        <Body>
                            {v.desc.split('\n').map(v => (
                                <p key={v}>{v}</p>
                            ))}
                        </Body>
                    </Card>
                    : null
                ))}
            </WingBlank>
        ) 
    }
}

export default Boss