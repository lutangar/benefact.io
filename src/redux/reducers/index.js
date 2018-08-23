import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import user from './user'
import projects from './projects'
import benefactors from './benefactors'

export default combineReducers({
    routing,
    user,
    projects,
    benefactors,
})
