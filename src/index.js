import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Home from './views/home'
import NotFound from './views/not-found'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './views/admin/AdminDashboard'
import AdminLeads from './views/admin/AdminLeads'
import AdminAbandoned from './views/admin/AdminAbandoned'
import AdminSettings from './views/admin/AdminSettings'
import AdminTrackingCodes from './views/admin/AdminTrackingCodes'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        
        <Route path="/admin">
          <AdminLayout>
            <Switch>
              <Route component={AdminDashboard} exact path="/admin/dashboard" />
              <Route component={AdminLeads} exact path="/admin/leads" />
              <Route component={AdminAbandoned} exact path="/admin/abandonados" />
              <Route component={AdminSettings} exact path="/admin/configuracoes" />
              <Route component={AdminTrackingCodes} exact path="/admin/rastreamento" />
              <Redirect from="/admin" to="/admin/dashboard" exact />
            </Switch>
          </AdminLayout>
        </Route>

        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
