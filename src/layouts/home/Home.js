import React, { Component } from 'react'
import { Link } from 'react-router'
import ProjectForm from '../../components/form/ProjectFormContainer'
import Loader from '../../components/Loader'

class Home extends Component {
  render () {
    return (
      <main className='container'>
        <div className='pure-g'>
          <div className='pure-u-1-1'>
            <h3>Projects</h3>
            {this.props.projectsFetching && <Loader /> }
            {this.props.hasProjects &&
              <ul>
                {this.props.projects.map(project =>
                  <li key={`project[${project.projectHash}]`}><Link to={`/project/${project.projectHash}`}>{project.description} {project.goal}</Link></li>
                )}
              </ul>
            }
            {!this.props.hasProjects && <p>There are no projects yet.</p>}

            <h3>{this.props.hasProjects ? 'Submit your project' : 'Be the first submit a project!'}</h3>
            <ProjectForm />
          </div>
        </div>
      </main>
    )
  }
}

export default Home
