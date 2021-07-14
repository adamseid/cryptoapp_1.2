import React, { Component } from 'react'

export default class FundPanel extends Component {

    ws = new WebSocket('ws://localhost:8000/ws/websocket/' + this.props.fund_name +'/')

    state = {
        loading_display: 'show',
        main_display: 'hide'
    }


    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected')
            this.setState({
                loading_display: 'hide'
            })
        }

        this.ws.onmessage = e => {
            console.log(e.data)
            this.setState({
                response: JSON.parse(e.data).response,
                fund_name: JSON.parse(e.data).response
            })
        }
    }

    render() {
        console.log(this.props)
        console.log(this.state)


        return (
            <div>
                <div>Fund Panel</div><br/>
                <div className={this.state.loading_display}>Loading...</div><br/>
                <div className={this.state.main_display}>
                    <div>Fund Name: {this.props.fund_name}</div>
                </div>
            </div>
        )
    }
}
