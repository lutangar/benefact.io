import { createSelector } from 'reselect'
import { getId as getProjectId, getProject, getLastFetched } from './projects'
import { hoursToMilliseconds } from '../../services/utils'

export const getDonations = state => Object.values(state.donations.items)

export const getProjectDonations = createSelector(
  getDonations,
  getProjectId,
  (donations, projectId) => donations.filter(donation => donation.projectId === projectId)
)

export const getProjectDonationsTotal = createSelector(
  getProjectDonations,
  (projectDonations) => projectDonations.reduce((total, donation) => total + donation.amount, 0)
)

export const areDonationsFetching = state => state.donations.fetching > 0

export const getDonationsLastFetched = state => state.donations.lastFetched

export const areDonationsStale = createSelector(
  getLastFetched,
  lastFetched => lastFetched ? (Date.now() > lastFetched + hoursToMilliseconds(0.2)) : true
)

export const getProjectBenefactorsCount = createSelector(
  getProjectDonations,
  (projectDonations) => projectDonations.length
)

export const hasProjectDonations = createSelector(
  getProjectDonations,
  areDonationsFetching,
  (projectDonations, donationsFetching) => !donationsFetching && projectDonations.length > 0
)

export const isProjectFunded = createSelector(
  getProjectDonationsTotal,
  getProject,
  (projectDonationsTotal, project) => project && (projectDonationsTotal >= project.amount)
)
