import * as React from 'react'

import { MainMenu } from 'layout/menu/MainMenu'
import { MerchantListConnected } from 'forms/merchant/containers/MerchantListConnected'
import Typography from '@material-ui/core/Typography'

export const MerchantListViewPage = () => {
  return (
    <React.Fragment>
      <MainMenu>
        <Typography variant="title" color="inherit" noWrap>
          Merchants
        </Typography>
      </MainMenu>
      <MerchantListConnected />
    </React.Fragment>
  )
}
