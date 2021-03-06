import React from 'react'
import { connect } from 'react-redux'
import { Result, WhiteSpace, List, Button, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    {logoutSubmit}
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {  
        const alert = Modal.alert
        alert('注销', '确定退出登陆?', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                browserCookie.erase('userid')
                this.props.logoutSubmit()
                window.location.href = window.location.href
            } },
          ]);
    }
    
    render() {
        const props = this.props
        const Item = List.Item
        const Brief = List.Item.Brief
        return props.user?(
            <div>
                {/* {(props.redirectTo && props.redirectTo !== '/login')?<Redirect to={props.redirectTo}/>:null} */}
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt="avatar"/>}
                    title={props.user}
                    message={props.type==='boss'?props.company:props.title}
                />
                <List renderHeader={()=>'简介'}>
                    <Item multipleLine='true'>
                        {props.title}
                        {props.desc.split('\n').map(v => 
                            <Brief key={v}>{v}</Brief>)} 
                        {props.money?<Brief>薪资：{props.money}</Brief>:null} 
                    </Item>
                </List>
                <WhiteSpace/>
                <Button onClick={this.logout}>注销</Button>
            </div>
        ):null
    }
}

export default User