import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLinkBar from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import { getMsgList, sendMsg, receiveMsg } from '../../redux/chat.redux'

@connect(
	state => state,
	{getMsgList, sendMsg, receiveMsg}
)
class Dashboard extends React.Component {
	constructor(props) {
		super(props)
		this.state = { text: '', msg: [] }
	}
	componentDidMount() {
		if(!this.props.chat.chatMsg.length) {
			this.props.getMsgList()
			this.props.receiveMsg()
		}

	}
	render() {
		const {pathname} = this.props.location
		const user =  this.props.user
		const navList = [
			{
				path: '/boss',
				text: '求职者',
				icon: 'boss',
				title: '求职者列表',
				component: Boss,
				hide: user.type === 'genius'
			},
			{
				path: '/genius',
				text: 'boss',
				icon: 'job',
				title: 'BOSS列表',
				component: Genius,
				hide: user.type === 'boss'
			},
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg
			},
			{
				path: '/me',
				text: '我',
				icon: 'user',
				title: '个人中心',
				component: User
			}
		]
		return (
			<div>
				<NavBar className='fixed-header' mode='dard'>{navList.find(v => v.path === pathname).title}</NavBar>
					<div style={{marginTop: 45}}>
						<Switch>
							{navList.map(v => (
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
					</div>
				<NavLinkBar data={navList}></NavLinkBar>
			</div>
		)
	}
}

export default Dashboard