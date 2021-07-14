import React, { Component } from 'react'
import FundPanel from './fund-panel/FundPanel'

export default class Admin extends Component {
    
    ws = new WebSocket('ws://localhost:8000/ws/websocket/NDAX/')

    state = {
        fund_name: '',
        fund_selection_display: 'show',
        fund_panel_display: 'hide'
    }

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected')
        }

        this.ws.onmessage = e => {
            console.log(e.data)
            this.setState({
                response: JSON.parse(e.data).response,
                fund_name: JSON.parse(e.data).response
            })
        }
    }

    sendRequest = () => {
        try {
            this.state.fund_name = document.getElementById('')      
            this.ws.send(JSON.stringify({
                'request': 'update-tables'
            }))
        } catch (error) {
            console.log(error)
        }
    }

    connectNDAX = () => {
        this.setState({ 
            fund_selection_display: 'hide',
            fund_panel_display: 'show',
        })
        this.ws.send(JSON.stringify({
            'request': 'NDAX'
        }))
    }

    connectShakepay = () => {
        this.setState({
            fund_selection_display: 'hide',
            fund_panel_display: 'show',
            fund_name: 'Shakepay'
        })
    }

    render() {
        return (
            <div>
                <div>Admin</div>
                <div className={this.state.fund_selection_display}>
                    <button onClick={this.connectNDAX}>NDAX</button>
                    <button onClick={this.connectShakepay}>Shakepay</button><br/>
                </div><br/>
                <div className={this.state.fund_panel_display}><FundPanel fund_name={this.state.fund_name}/></div>

            </div>
        )
    }
}
