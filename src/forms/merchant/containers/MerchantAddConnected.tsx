import { merchantCreate, merchantProcessSelector, merchantSelector, merchantValidate } from 'forms/merchant/redux'

import { IMerchantCreateRequest } from 'entity/api'
import { MerchantAdd } from 'forms/merchant/components/MerchantAdd'
import { appConfig } from 'config/appConfig'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  merchant: merchantSelector(state),
  process: merchantProcessSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onCreate: (createRequest: IMerchantCreateRequest) => {
    return dispatch(merchantCreate(createRequest)).then(id => appConfig.history.push('/merchants/' + id))
  },

  onValidate: (value: Partial<IMerchantCreateRequest>, fieldName?: string) =>
    dispatch(merchantValidate(value, fieldName))
})

export const MerchantAddConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantAdd)
