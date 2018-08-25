import { createSelector } from 'reselect'
import { getId as getProjectId } from './projects'

export const getDonations = state => state.donations.items

export const getProjectDonations = createSelector(
  getDonations,
  getProjectId,
  (donations, projectId) => donations.filter(donation => donation.project === projectId)
)

export const getProjectDonationsTotal = createSelector(
  getProjectDonations,
  (projectDonations) => projectDonations.reduce((total, donation) => total + donation.amount, 0)
)

export const areDonationsFetching = state => state.donations.fetching > 0

export const getProjectBenefactorsCount = createSelector(
  getProjectDonations,
  (projectDonations) => projectDonations.length
)

export const hasProjectDonations = createSelector(
  getProjectDonations,
  areDonationsFetching,
  (projectDonations, donationsFetching) => !donationsFetching && projectDonations.length > 0
)
