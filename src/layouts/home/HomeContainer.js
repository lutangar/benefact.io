import { connect } from 'react-redux'
import Home from "./Home";

export default connect((state, ownProps) => ({
  projects: state.projects,
  benefactors: state.benefactors,
}))(Home)
