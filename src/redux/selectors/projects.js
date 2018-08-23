import { createSelector } from 'reselect'

export const getId = (state, props) => parseInt(props.params.id)

export const getProjects = state => state.projects;

export const getProject = createSelector(
    getProjects,
    getId,
    (projects, id) => projects.find(project => project.id === id)
)
