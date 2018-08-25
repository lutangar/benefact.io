import { createAction } from 'redux-actions'
import * as PROJECTS from '../constants/projects'

export const createProject = (payload, meta) => ({
  type: PROJECTS.CREATE_PROJECT_REQUEST,
  payload,
  meta
})
export const createProjectSuccess = createAction(PROJECTS.CREATE_PROJECT_SUCCESS)
export const createProjectFailure = createAction(PROJECTS.CREATE_PROJECT_FAILURE)

export const fetchProject = createAction(PROJECTS.FETCH_PROJECT_REQUEST)
export const fetchProjectSuccess = createAction(PROJECTS.FETCH_PROJECT_SUCCESS)
export const fetchProjectFailure = createAction(PROJECTS.FETCH_PROJECT_FAILURE)

export const fetchProjects = createAction(PROJECTS.FETCH_PROJECTS_REQUEST)
export const fetchProjectsSuccess = createAction(PROJECTS.FETCH_PROJECTS_SUCCESS)
export const fetchProjectsFailure = createAction(PROJECTS.FETCH_PROJECTS_FAILURE)
export const cancelFetchProjects = createAction(PROJECTS.FETCH_PROJECTS_CANCEL)
