import * as PROJECTS from '../../constants/projects'

export const fixtures = Date.now()

export const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS.FETCH_PROJECTS_SUCCESS:
      return action.payload
    case PROJECTS.FETCH_PROJECTS_FAILURE:
      return state
    default:
      return state
  }
}
