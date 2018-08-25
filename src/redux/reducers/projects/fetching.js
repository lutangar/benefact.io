import * as PROJECTS from '../../constants/projects'

export const initialState = 0

export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS.FETCH_PROJECTS_REQUEST:
      return state + 1
    case PROJECTS.FETCH_PROJECTS_FAILURE:
    case PROJECTS.FETCH_PROJECTS_SUCCESS:
      return state - 1
    default:
      return state
  }
}
