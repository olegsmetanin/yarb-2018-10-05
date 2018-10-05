import * as React from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import { BidListConnected } from 'forms/bid/containers/BidListConnected'
// import { History } from 'history'
import { MainMenu } from 'layout/menu/MainMenu'
import { MerchantMenuHeaderConnected } from 'forms/merchant/containers/MerchantMenuHeaderConnected'
import { MerchantOverviewConnected } from 'forms/merchant/containers/MerchantOverviewConnected'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

// import { withRouter } from 'react-router-dom'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      marginTop: 128,
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    body: {
      backgroundColor: theme.palette.background.default,
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    cardWrapper: {
      width: 500
    },
    progress: {},
    header: {
      width: '100%',
      backgroundColor: theme.palette.primary.dark
    },
    tab: {
      flexGrow: 1
    },
    appBar: {
      marginTop: 48
    },
    content: {
      marginTop: 128
    }
  })

// Type whatever you expect in 'this.props.match.params.*'
type MatchParams = {
  merchantId: string
}

export interface BaseMerchantViewProps {
  classes: any
}

export interface BaseMerchantViewState {
  tab: number
  merchantId: string
}

export class BaseMerchantView extends React.Component<
  BaseMerchantViewProps & RouteComponentProps<MatchParams> & WithStyles<typeof styles>,
  BaseMerchantViewState
> {
  constructor(props) {
    super(props)
    this.state = {
      tab: 0,
      merchantId: props.match.params.merchantId
    }
  }

  onChangeTab = ({}, value: number) => {
    this.setState({
      tab: value
    })
  }

  render() {
    const { classes } = this.props
    const { tab, merchantId } = this.state

    return (
      <React.Fragment>
        <MainMenu>
          <MerchantMenuHeaderConnected merchantId={merchantId} />
        </MainMenu>
        <AppBar position="fixed" color={'default'} className={classes.appBar}>
          <Tabs
            value={this.state.tab}
            onChange={this.onChangeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Overview" />
            <Tab label="Bids" />
          </Tabs>
        </AppBar>
        <div className={classes.content}>
          {tab === 0 && <MerchantOverviewConnected merchantId={merchantId} />}
          {tab === 1 && <BidListConnected merchantId={merchantId} />}
        </div>
      </React.Fragment>
    )
  }
}

export const MerchantViewPage = withRouter<any>(withStyles(styles)(BaseMerchantView))
