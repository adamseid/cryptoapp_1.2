import React, { Component } from 'react'

export default class SpreadsheetSelector extends Component {
    test = ['a', 'b', 'c']

    state = {
        filename: ''
    }

    selectSpreadsheet = (data) => {
        console.log('select spreadsheet')
        /*
        this.props.websocket.send(JSON.stringify({
            'request': 'select-spreadsheet',
            'data': {
                'filename': data
            }
        }))
        */
        this.setState({filename: data})
    }

    update = () => {
        console.log('update')
        console.log(this.state.filename)
        
        this.props.websocket.send(JSON.stringify({
            'request': 'update-spreadsheets',
            'data': {
                'filename': this.state.filename
            }
        }))
        
    }

    render() {
        return (
            <div>
                <div>Spreadsheet Selector</div>
                <div>
                    { 
                        this.props.data.map((data, i) => 
                            <div key={i}><button onClick={this.selectSpreadsheet.bind(this, data)}>{data}</button></div>
                        ) 
                    }
                </div><br/>
                <button onClick={this.update}>Update</button>
            </div>
        )
    }
}
