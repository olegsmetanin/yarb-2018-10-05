import * as React from 'react'

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import { MainMenu } from 'layout/menu/MainMenu'
import { MerchantAddConnected } from 'forms/merchant/containers/MerchantAddConnected'
import Typography from '@material-ui/core/Typography'

const styles = (theme: Theme) =>
  createStyles({
    chevronLeftIcon: {
      marginLeft: -32,
      color: theme.palette.common.white
    },
    title: {
    }
  })

export interface BaseMerchantViewProps {
  // classes: any
}

export class BaseMerchantView extends React.Component<BaseMerchantViewProps & WithStyles<typeof styles>, {}> {
  renderHeader = () => {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Link to={'/merchants/'} className={classes.chevronLeftIcon}>
          <IconButton color="inherit">
            <ChevronLeftIcon />
          </IconButton>
        </Link>
        <Typography variant="title" color="inherit" noWrap className={classes.title}>
          New merchant
        </Typography>
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        <MainMenu>{this.renderHeader()}</MainMenu>
        <MerchantAddConnected />
      </React.Fragment>
    )
  }
}

export const MerchantAddPage = withStyles(styles)(BaseMerchantView)
