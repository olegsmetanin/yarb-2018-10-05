import { IMerchant, IMerchantQuery } from 'entity/api'
import {
  merchantDelete,
  merchantErrorsSelector,
  merchantLoad,
  merchantProcessSelector,
  merchantSave,
  merchantSelector,
  merchantValidate
} from 'forms/merchant/redux'

import { MerchantOverview } from 'forms/merchant/components/MerchantOverview'
import { appConfig } from 'config/appConfig'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  merchant: merchantSelector(state),
  process: merchantProcessSelector(state),
  errors: merchantErrorsSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onLoad: (query: IMerchantQuery) => dispatch(merchantLoad(query)),
  onSave: (value: IMerchant) => dispatch(merchantSave(value)),
  onDelete: (id: string) => {
    dispatch(merchantDelete(id)).then(() => appConfig.history.push('/merchants'))
  },
  onValidate: (value: Partial<IMerchant>, fieldName?: string) => dispatch(merchantValidate(value, fieldName))
})

export const MerchantOverviewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantOverview)
