import { connect } from 'react-redux'
import Home from './Home'
import { areProjectsFetching, getProjects, hasProjects } from '../../redux/selectors/projects'

export default connect((state, ownProps) => ({
  projects: getProjects(state),
  projectsFetching: areProjectsFetching(state),
  hasProjects: hasProjects(state)
}))(Home)
