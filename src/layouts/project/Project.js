import React, { Component } from 'react'
import DonationForm from '../../components/form/DonationFormContainer'
import Loader from '../../components/Loader'
import Warning from '../../components/Warning'
import ApproveForm from '../../components/form/ApproveFormContainer'

class Project extends Component {
  componentDidMount () {
    this.props.fetchDonations(this.props.id)
  }

  get hasDonations () {
    return !this.props.donationsFetching && this.props.donations.length > 0
  }

  get isProjectOwner() {
    return this.props.recipient === this.props.account
  }

  render () {
    return (
      <main className='container'>
        <div className='pure-g'>
          <div className='pure-u-1-1'>
            <h2>{this.props.name}</h2>
            <p>{this.props.description}</p>
            <em>{this.props.currentAmount} Wei collected on the {this.props.amount} required.</em>
            <dl>
              <dt>Closed</dt>
              <dd>{this.props.closed ? 'Yes' : 'No'}</dd>

              <dt>Approved</dt>
              <dd>{this.props.approved ? 'Yes' : 'No'}</dd>

              <dt>Number of donations</dt>
              <dd>{this.props.numberOfDonations}</dd>
            </dl>
            <h2>List of benefactors</h2>
            {this.hasDonations &&
            <div>
              <p>{this.props.benefactorsCount} <em>benefectors</em> have given to the <strong>{this.props.name}</strong> project so far.</p>
              <ul>
                {this.props.donations.map(donation =>
                  <li key={`donation[${donation.donationId}]`}>{donation.benefactor} said <em>"{donation.message}"</em> and gave <strong>{donation.amount} Wei</strong></li>
                )}
              </ul>
            </div>}
            {this.props.donationsFetching && <Loader />}
            {!this.hasDonations &&
              <p>No benefactors have given to the <strong>{this.props.name}</strong> project so far.</p>
            }
            <h2>{this.hasDonations ? 'Donate' : 'Be the first to donate!'}</h2>
            {this.props.approved ? (
              <div>

                {!this.isProjectOwner ? (
                  <DonationForm projectId={this.props.projectId} />
                ) : (<Warning>You can't donate to your own project ;)</Warning>)}
              </div>
            ) : (
              <div>
                  <Warning>This project must be approved to receive donations.</Warning>
                  {this.props.isOwner && <ApproveForm projectId={this.props.projectId} /> }
              </div>
            )}

          </div>
        </div>
      </main>
    )
  }
}

export default Project
