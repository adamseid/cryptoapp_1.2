import React, { Component } from 'react'
import UpdateTables from './update-tables/UpdateTables'

export default class FundPanel extends Component {

    ws = new WebSocket('ws://https://cryptoapp1-2server.herokuapp.com/ws/websocket/' + this.props.location.state.fund_name + '/')

    state = {
        loading_display: 'show',
        head_display: 'hide',
        main_display: 'hide',
        update_tables_display: 'hide',
        goback_display: 'hide',

        spreadsheet_selector: {
            display: 'hide',
            data: []
        }
    }

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected')
            this.setState({
                loading_display: 'hide',
                head_display: 'show',
                main_display: 'show',
            })
        }

        this.ws.onmessage = e => {
            console.log(JSON.parse(e.data))
            this.setState({response: JSON.parse(e.data).response})

            if (JSON.parse(e.data).response === 'success - Shakepay.getSpreadsheets()') {
                var spreadsheet_selector = {...this.state.spreadsheet_selector}
                spreadsheet_selector.display = 'show'
                spreadsheet_selector.data = JSON.parse(e.data).data
                this.setState({spreadsheet_selector})
            }
        }
    }

    updateTables = () => {
        this.setState({
            main_display: 'hide',
            update_tables_display: 'show',
            goback_display: 'show'
        })
    }

    goBack = () => {
        this.setState({
            main_display: 'show',
            update_tables_display: 'hide',
            goback_display: 'hide',
            spreadsheetselector_display: 'hide'
        })
    }

    render() {
        return (
            <div>
                <div className={this.state.loading_display}>Loading...</div>
                <div className={this.state.head_display}>
                    <div>Fund Panel</div>
                    <button onClick={this.goBack} className={this.state.goback_display}>Go Back</button>
                </div>
                <div className={this.state.main_display}> 
                    <div>Fund Name: {this.props.location.state.fund_name}</div>
                    <button onClick={this.updateTables}>Update Tables</button>
                </div>
                <div className={this.state.update_tables_display}>
                    <UpdateTables 
                        fund_name = {this.props.location.state.fund_name} 
                        websocket = {this.ws}
                        spreadsheet_selector = {this.state.spreadsheet_selector}
                    />
                </div>
            </div>
        )
    }
}

