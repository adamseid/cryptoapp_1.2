
import React, { Component } from 'react'
import SpreadsheetSelector from './spreadsheet-selector/SpreadsheetSelector'

export default class UpdateTables extends Component {
    state = {
        response: ''
    }

    componentDidMount() {
        this.props.websocket.onmessage = e => {
            console.log(JSON.parse(e.data))
            this.setState({response: JSON.parse(e.data).response})
        }
    }



    getSpreadsheets = () => {
        console.log('get spreadsheets')
        this.props.websocket.send(JSON.stringify({
            'request': 'get-spreadsheets',
            'data': {
                fund_name: this.props.fund_name
            }
        }))
    }



    render() {
        return (
            <div>
                <div>Update Tables</div>
                <div>Fund Name: {this.props.fund_name}</div>
                <button onClick={this.getSpreadsheets}>Get Spreadsheets</button>
                <div className={this.props.spreadsheet_selector.display}><br/>
                    <SpreadsheetSelector 
                        websocket = {this.props.websocket}
                        data={this.props.spreadsheet_selector.data}
                    />
                </div>
                
            </div>
        )
    }
}
