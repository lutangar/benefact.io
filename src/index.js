import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import App from './App'
import Home from './layouts/home/HomeContainer'
import Project from './layouts/project/ProjectContainer'
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='project/:id' component={Project} />
      </Route>
    </Router>
  </Provider>
),
document.getElementById('root')
)
