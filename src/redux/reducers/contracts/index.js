import { combineReducers } from 'redux'
import deployed from './deployed'
import watching from './watching'
import instance from './instance'
import owner from './owner'

export default combineReducers({
  deployed,
  watching,
  instance,
  owner,
})
