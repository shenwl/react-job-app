import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'

class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {

        const navList = this.props.data.filter(v => !v.hide)
        console.log(navList)

        return (
            <TabBar>
                {navList.map(v => (
                <TabBar.item
                    key={v.path}
                    title={v.text}
                    icon={{uri: require(`./img/${v.icon}.png`)}}
                ></TabBar.item>
                ))}
            </TabBar>
        )
    }
}

export default NavLinkBar