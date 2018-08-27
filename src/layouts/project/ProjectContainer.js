import { connect } from 'react-redux'
import Project from './Project'
import { getProject } from '../../redux/selectors/projects'
import { getProjectDonations, areDonationsFetching, getProjectDonationsTotal, getProjectBenefactorsCount, hasProjectDonations } from '../../redux/selectors/donations'
import { fetchDonations } from '../../redux/actions/donations'
import { isOwner } from '../../redux/selectors'
import { getAccount } from '../../redux/selectors/accounts'

export default connect((state, ownProps) => ({
  ...getProject(state, ownProps),
  donations: getProjectDonations(state, ownProps),
  donationsTotal: getProjectDonationsTotal(state, ownProps),
  benefactorsCount: getProjectBenefactorsCount(state, ownProps),
  hasDonations: hasProjectDonations(state, ownProps),
  donationsFetching: areDonationsFetching(state, ownProps),
  account: getAccount(state, ownProps),
  isOwner: isOwner(state)
}), { fetchDonations })(Project)
