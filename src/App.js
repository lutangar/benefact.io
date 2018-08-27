import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import Notification from './components/Notification'
import Warning from './components/Warning'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

import { loadProvider } from './redux/actions/provider'
import { fetchProjects } from './redux/actions/projects'
import { fetchPlatformStatus } from './redux/actions/platform'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import { isOpen, isOwner, isProviderLoaded } from './redux/selectors'
import { getAccount } from './redux/selectors/accounts'
import PlatformForm from './components/form/PlatformFormContainer'

class App extends Component {
  componentDidMount () {
    this.props.loadProvider()
    this.props.fetchProjects()
    this.props.fetchPlatformStatus()
  }

  render () {
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
            {this.props.isOwner &&
              <li className='pure-menu-item'>
                <PlatformForm open={this.props.open} />
              </li>
            }
            {this.props.account && <OnlyGuestLinks />}
          </ul>
        </nav>
        {this.props.open ? (
          <div>
            {this.props.children}
            {this.props.notification && <Notification>{this.props.notification}</Notification>}
          </div>
        ) : (
          <div style={{ paddingTop: '150px', textAlign: 'center' }}><Warning>Sorry the platform is closed for now, wait for an <em>admin</em> to open it.</Warning></div>
        )}
      </div>
    )
  }
}

export default connect((state) => ({
  providerLoaded: isProviderLoaded(state),
  notification: state.notification,
  account: getAccount(state),
  open: isOpen(state),
  isOwner: isOwner(state)
}), { fetchProjects, loadProvider, fetchPlatformStatus })(App)
