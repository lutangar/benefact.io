import { connect } from 'react-redux'
import Project from "./Project";
import { getProject } from "../../redux/selectors/projects";

export default connect((state, ownProps) => ({
  ...getProject(state, ownProps),
}))(Project)
