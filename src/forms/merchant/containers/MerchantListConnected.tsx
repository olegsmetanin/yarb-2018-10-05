import { merchantDelete, merchantsLoad, merchantsSelector, merchantsStateSelector } from 'forms/merchant/redux'

import { IMerchantsQuery } from 'entity/api'
import { MerchantList } from 'forms/merchant/components/MerchantList'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  merchants: merchantsSelector(state),
  state: merchantsStateSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onLoad: (query: IMerchantsQuery) => dispatch(merchantsLoad(query)),
  onDelete: (id: string) => dispatch(merchantDelete(id))
})

export const MerchantListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantList)
