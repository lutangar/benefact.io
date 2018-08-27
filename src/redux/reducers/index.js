import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import user from './user'
import projects from './projects'
import donations from './donations'
import provider from './provider'
import accounts from './accounts'
import contracts from './contracts'
import notification from './notification'
import open from './open'

export default combineReducers({
  routing,
  user,
  projects,
  donations,
  form,
  provider,
  contracts,
  accounts,
  notification,
  open
})
