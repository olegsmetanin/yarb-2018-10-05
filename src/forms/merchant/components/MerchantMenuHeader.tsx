import * as React from 'react'

import { IMerchant, IMerchantQuery } from 'entity/api'
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { IProcessState } from 'redux/api'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      marginTop: 112,
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
    avatar: {
      width: 32,
      height: 32
    },
    title: {
      marginLeft: 16
    },
    chevronLeftIcon: {
      marginLeft: -32,
      color: theme.palette.common.white
    }
  })

export interface BaseMerchantMenuHeaderProps {
  merchantId: string
  merchant: IMerchant
  state: IProcessState
  classes: any
  onLoad(query: IMerchantQuery): Promise<IMerchant>
}

export class BaseMerchantMenuHeader extends React.Component<
  BaseMerchantMenuHeaderProps & WithStyles<typeof styles>,
  {}
> {
  componentDidMount() {
    const { merchant } = this.props
    if (!merchant || merchant.id !== this.props.merchantId) {
      this.props.onLoad({
        merchantId: this.props.merchantId
      })
    }
  }

  render() {
    const { classes, merchant, merchantId, state } = this.props

    return (
      <React.Fragment>
        <Link to={'/merchants/'} className={classes.chevronLeftIcon}>
          <IconButton color="inherit">
            <ChevronLeftIcon />
          </IconButton>
        </Link>
        {merchant && merchant.id === merchantId && <Avatar src={merchant.avatarUrl} className={classes.avatar} />}
        <Typography variant="title" color="inherit" noWrap className={classes.title}>
          {state && state.isLoading ? '...' : merchant ? merchant.firstname + ' ' + merchant.lastname : null}
        </Typography>
      </React.Fragment>
    )
  }
}

export const MerchantMenuHeader = withStyles(styles)(BaseMerchantMenuHeader)