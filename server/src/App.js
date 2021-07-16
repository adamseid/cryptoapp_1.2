import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Admin from './components/admin/Admin'
import FundPanel from './components/admin/fund-panel/FundPanel'
import UpdateTables from './components/admin/fund-panel/update-tables/UpdateTables'
import Test from './components/test/Admin2'


function App() {
  return (
    <div>
      <BrowserRouter><Switch>
        <Route
          path='/admin'
          render={({ match: { url } }) =>(
            <>
              <Route path={`${url}/`} component={Admin} exact />
              <Route path={`${url}/fund-panel`} component={FundPanel}/> 
              <Route path={`${url}/update-tables`} component={UpdateTables}/>
            </>
          )}
        />
        <Route 
          path='/test'
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} component={Test} exact />
            </>
          )}
        />
      </Switch></BrowserRouter>
    </div>
  );
}

export default App;
