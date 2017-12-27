import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class Boss extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
       
    }
    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.state.data.map(v => (
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