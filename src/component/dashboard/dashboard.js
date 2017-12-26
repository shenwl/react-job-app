import React from 'react'
import { Route } from 'react-router-dom'
import { NavBar, Icon, TabBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLinkBar from '../navlink/navlink'

function Boss() {
	return <h2>Boss index</h2>
}
function Genius() {
	return <h2>genius index</h2>
}
function Msg() {
	return <h2>Msg index</h2>
}
function User() {
	return <h2>user index</h2>
}

@connect(
	state => state 
)
class Dashboard extends React.Component {

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
				<NavBar mode='dard'>{navList.find(v => v.path==pathname).title}</NavBar>
				<h2>content</h2>
				<NavLinkBar data={navList}></NavLinkBar>

			</div>
		)
	}
}

export default Dashboard