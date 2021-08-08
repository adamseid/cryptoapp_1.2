import React from 'react'
import { useHistory } from 'react-router-dom';


export default function Admin() {
    let history = useHistory()
    
    const redirectNDAX = () => {
        history.push({
            pathname: '/admin/fund-panel',
            state: {
                fund_name: 'NDAX'
            }
        })
    }

    const redirectShakepay = () => {
        history.push({
            pathname: '/admin/fund-panel',
            state: {
                fund_name: 'Shakepay'
            }
        })
    }


    return (
        <div>
            <div>Admin Panel</div>
            <button onClick={redirectNDAX}>NDAX</button>
            <button onClick={redirectShakepay}>Shakepay</button>
        </div>
    )
}
