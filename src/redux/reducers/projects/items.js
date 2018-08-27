import * as PROJECTS from '../../constants/projects'

export const fixtures = [
  {
    id: 1,
    name: 'Benefact.io',
    description: 'Lorem ipsum dolor sit amet',
    goal: 5000000
  },
  {
    id: 2,
    name: 'Lorem',
    description: 'Lorem ipsum dolor sit amet',
    goal: 2000000
  },
  {
    id: 3,
    name: 'Ipsum',
    description: 'Lorem ipsum dolor sit amet',
    goal: 3000000
  },
  {
    id: 4,
    name: 'Dolor',
    description: 'Lorem ipsum dolor sit amet',
    goal: 200000
  },
  {
    id: 5,
    name: 'Sit',
    description: 'Lorem ipsum dolor sit amet',
    goal: 1000
  },
  {
    id: 6,
    name: 'Amet',
    description: 'Lorem ipsum dolor sit amet',
    goal: 999
  }
]

export const projectInitialState = {
  currentAmount: 0,
  approved: false,
  closed: false,
  benefactors: {},
}

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS.FETCH_PROJECT_SUCCESS:
    case PROJECTS.PROJECT_ADDED:
      return {
        ...state,
        [action.payload.projectId]: {
          ...projectInitialState,
          ...state[action.payload.projectId],
          ...action.payload,
        }
      }
    case PROJECTS.FETCH_PROJECT_FAILURE:
      return state
    case PROJECTS.PROJECT_CLOSED:
      return { ...state, [action.payload.projectId]: { ...projectInitialState, ...state[action.payload.projectId], closed: true } }
    case PROJECTS.PROJECT_STATUS_CHANGED:
      return { ...state, [action.payload.projectId]: { ...projectInitialState, ...state[action.payload.projectId], ...action.payload } }
    case PROJECTS.APPROVE_PROJECT_SUCCESS:
      return { ...state, [action.payload.projectId]: { ...projectInitialState, ...state[action.payload], approved: true } }
    default:
      return state
  }
}
