import React from 'react'

export default function appForm(Comp) {
    return class WrapperComp extends React.Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.changeHandler = this.changeHandler.bind(this)
        }
        changeHandler(key, value) {
            this.setState({
                [key]: value
            })
        }
        render() {
            return <Comp changeHandler={this.changeHandler} state={this.state} {...this.props}></Comp>
        }
    }
}