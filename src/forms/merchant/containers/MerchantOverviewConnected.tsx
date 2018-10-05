import { IMerchant, IMerchantQuery } from 'entity/api'
import {
  merchantDelete,
  merchantLoad,
  merchantSave,
  merchantSelector,
  merchantStateSelector
} from 'forms/merchant/redux'

import { MerchantOverview } from 'forms/merchant/components/MerchantOverview'
import { appConfig } from 'config/appConfig'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  merchant: merchantSelector(state),
  state: merchantStateSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onLoad: (query: IMerchantQuery) => dispatch(merchantLoad(query)),
  onSave: (value: IMerchant) => dispatch(merchantSave(value)),
  onDelete: (id: string) => {
    dispatch(merchantDelete(id)).then(() => appConfig.history.push('/merchants'))
  }
})

export const MerchantOverviewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantOverview)
