import React from 'react'
import { connect } from 'react-redux'
import { Result, WhiteSpace, List, Button } from 'antd-mobile'

@connect(
    state => state.user
)
class User extends React.Component {
    render() {
        const props = this.props
        const Item = List.Item
        const Brief = List.Item.Brief
        return props.user?(
            <div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}}/>}
                    title={props.user}
                    message={props.type==='boss'?props.company:props.title}
                />
                <List
                    renderHeader={()=>'简介'}
                >
                    <Item multipleLine='true'>
                        {props.title}
                        {props.desc.split('\n').map(v => 
                            <Brief key={v}>{v}</Brief>)} 
                        {props.money?<Brief>薪资：{props.money}</Brief>:null} 
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Item>注销</Item>
                </List>
            </div>
        ):null
    }
}

export default User