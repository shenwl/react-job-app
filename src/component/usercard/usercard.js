import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.props.userlist.map(v => (
                    v.avatar ? (
                    <Card 
                        onClick={() => this.clickHandler(v)}
                        key={v._id}>
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}>
                        </Header>
                        <Body>
                            {v.type==='boss'?<div>公司：{v.company}</div>:null}
                            {v.desc.split('\n').map(val => (
                                <p key={val}>{val}</p>
                            ))}
                            {v.type==='boss'?<div>薪资：{v.money}</div>:null}
                        </Body>
                    </Card>)
                    : null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard