import * as React from 'react'

import { Redirect, Route, Router, Switch } from 'react-router-dom'

import { AppLayout } from 'layout/AppLayout'
import { MerchantAddPage } from 'forms/merchant/MerchantAddPage'
import { MerchantListViewPage } from 'forms/merchant/MerchantListViewPage'
import { MerchantViewPage } from 'forms/merchant/MerchantViewPage'
// import { ScrollContext } from 'react-router-scroll-4'
import { appConfig } from 'config/appConfig'

// TODO: Make scroll restore work (react-router-scroll-4 does not work)
export const Routes = () => (
  <Router history={appConfig.history}>
    <React.Fragment>
      <Route component={AppLayout} />
      <Switch>
        <Redirect exact from="/" to="/merchants" />
        <Route exact path="/merchants" component={MerchantListViewPage} />
        <Route exact path="/merchants/add" component={MerchantAddPage} />
        <Route exact path="/merchants/:merchantId" component={MerchantViewPage} />
      </Switch>
    </React.Fragment>
  </Router>
)
