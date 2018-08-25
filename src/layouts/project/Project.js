import React, { Component } from 'react'
import DonationForm from '../../components/form/DonationFormContainer'
import Loader from '../../components/Loader'

class Project extends Component {
  get hasDonations () {
    return !this.props.donationsFetching && this.props.donations.length > 0
  }

  render () {
    return (
      <main className='container'>
        <div className='pure-g'>
          <div className='pure-u-1-1'>
            <h1>{this.props.projectHash}</h1>
            <p>{this.props.description}</p>
            <em>{this.props.currentAmount}/{this.props.amount}</em>
            <dl>
              <dt>Closed</dt>
              <dd>{this.props.closed ? 'Yes' : 'No'}</dd>

              <dt>Approved</dt>
              <dd>{this.props.approved ? 'Yes' : 'No'}</dd>

              <dt>Number of donations</dt>
              <dd>{this.props.numberOfDonations}</dd>
            </dl>
            <h2>List of benefactors</h2>
            {this.hasDonations && <p>{this.props.benefactorsCount} <em>benefectors</em> have given to the <strong>{this.props.name}</strong> project so far.</p>}
            {this.props.donationsFetching && <Loader />}
            {!this.hasDonations &&
              <p>No benefactors have given to the <strong>{this.props.name}</strong> project so far.</p>
            }
            <h2>{this.hasDonations ? 'Donate' : 'Be the first to donate!'}</h2>
            <DonationForm />
          </div>
        </div>
      </main>
    )
  }
}

export default Project
