import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import reducer from './redux/reducers'
import sagas from './redux/sagas'

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const routingMiddleware = routerMiddleware(browserHistory)

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      routingMiddleware,
      sagaMiddleware
    )
  )
)

sagaMiddleware.run(sagas)

export default store
