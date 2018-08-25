import { connect } from 'react-redux'
import Dashboard from './Dashboard'

export default connect((state, ownProps) => ({
  projects: state.projects,
  benefactors: state.benefactors
}))(Dashboard)
