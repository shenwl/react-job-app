import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const avatarList = 'boy,girl,woman,man,koala,tiger,whale,zebra'
                            .split(',')
                            .map(v => ({
                                icon: require(`../img/${v}.png`),
                                text: v
                            }))
        const gridHeader = this.state.icon?
                            (<div>
                                <span>已选择</span>
                                <img style={{width: 20}} src={this.state.icon} alt=""/>
                            </div>)
                            : '请选择头像'
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid 
                        data={avatarList} columnNum={4}
                        onClick={el => {
                            this.setState(el)
                            this.props.selectAvatar(el.text)
                        }}
                        activeStyle={{opacity: 0.5}} />
                </List>   
            </div>
            
        )
    }
}

export default AvatarSelector