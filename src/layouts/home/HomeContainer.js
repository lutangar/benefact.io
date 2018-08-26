import { connect } from 'react-redux'
import Home from './Home'
import { areProjectsFetching, getProjects, hasProjects } from '../../redux/selectors/projects'
import { createProject } from '../../redux/actions/projects'

export default connect((state) => ({
  projects: getProjects(state),
  projectsFetching: areProjectsFetching(state),
  hasProjects: hasProjects(state)
}), { createProject })(Home)
