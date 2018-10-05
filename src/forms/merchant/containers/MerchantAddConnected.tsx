import { merchantCreate, merchantSelector, merchantStateSelector } from 'forms/merchant/redux'

import { IMerchantCreateRequest } from 'entity/api'
import { MerchantAdd } from 'forms/merchant/components/MerchantAdd'
import { appConfig } from 'config/appConfig'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  merchant: merchantSelector(state),
  state: merchantStateSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onCreate: (createRequest: IMerchantCreateRequest) => {
    return dispatch(merchantCreate(createRequest)).then(id => appConfig.history.push('/merchants/' + id))
  }
})

export const MerchantAddConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantAdd)
