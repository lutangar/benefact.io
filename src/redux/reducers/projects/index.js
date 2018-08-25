import { combineReducers } from 'redux'
import fetching from './fetching'
import lastFetched from './lastFetched'
import items from './items'

export default combineReducers({
  fetching,
  lastFetched,
  items
})
