import { createSelector } from 'reselect'
import { hoursToMilliseconds } from '../../services/utils'

export const getId = (state, props) => parseInt(props.params.id)

export const getProjects = state => Object.values(state.projects.items)
export const getLastFetched = state => state.projects.lastFetched

export const getProject = createSelector(
  getProjects,
  getId,
  (projects, id) => projects.find(project => project.projectId === id)
)

export const areProjectsFetching = state => state.projects.fetching > 0

export const getProjectsLastFetched = state => state.projects.lastFetched

export const areProjectsStale = createSelector(
  getLastFetched,
  lastFetched => lastFetched ? (Date.now() > lastFetched + hoursToMilliseconds(0.2)) : true
)

export const getProjectsCount = createSelector(
  getProjects, projects => projects.length
)

export const hasProjects = createSelector(
  areProjectsFetching,
  getProjectsCount,
  (projectsFetching, projectsCount) => !projectsFetching && projectsCount > 0
)
