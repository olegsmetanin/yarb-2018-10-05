import { bidsLoad, bidsQuerySelector, bidsSelector, bidsStateSelector } from 'forms/bid/redux'

import { BidList } from 'forms/bid/components/BidList'
import { IBidsQuery } from 'entity/api'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  bids: bidsSelector(state),
  query: bidsQuerySelector(state),
  state: bidsStateSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onLoad: (query: IBidsQuery) => dispatch(bidsLoad(query))
})

export const BidListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BidList)
