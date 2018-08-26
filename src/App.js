import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import Notification from './components/Notification'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

import { loadProvider } from './redux/actions/provider'
import { fetchProjects } from './redux/actions/projects'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import { isProviderLoaded } from './redux/selectors'

class App extends Component {
  componentDidMount () {
    this.props.loadProvider()
    this.props.fetchProjects()
  }

  render () {
    console.log(this.props)
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className='pure-menu-item'>
          <Link to='/dashboard' className='pure-menu-link'>Dashboard</Link>
        </li>
        <li className='pure-menu-item'>
          <Link to='/profile' className='pure-menu-link'>Profile</Link>
        </li>
        <LogoutButtonContainer />
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <LoginButtonContainer />
      </span>
    )

    return (
      <div className='App'>
        <nav className='navbar pure-menu pure-menu-horizontal'>
          <Link to='/' className='pure-menu-heading pure-menu-link'>Benefact.io</Link>
          <ul className='pure-menu-list navbar-right'>
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        </nav>
        {this.props.children}
        {this.props.notification && <Notification>{this.props.notification}</Notification>}
      </div>
    )
  }
}

export default connect((state) => ({ providerLoaded: isProviderLoaded(state), notification: state.notification }), { fetchProjects, loadProvider })(App)
