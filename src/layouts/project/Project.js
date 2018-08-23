import React, { Component } from 'react'

class Project extends Component {
  render() {
    console.log(this.props);
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>{this.props.name}</h1>
            <p>{this.props.description}</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Project
