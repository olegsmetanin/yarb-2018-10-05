import { merchantLoad, merchantSelector, merchantStateSelector } from 'forms/merchant/redux'

import { IMerchantQuery } from 'entity/api'
import { MerchantMenuHeader } from 'forms/merchant/components/MerchantMenuHeader'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  merchant: merchantSelector(state),
  state: merchantStateSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onLoad: (query: IMerchantQuery) => dispatch(merchantLoad(query))
})

export const MerchantMenuHeaderConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantMenuHeader)
