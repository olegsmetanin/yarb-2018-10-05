import * as React from 'react'

import { IMerchant, IMerchantsQuery } from 'entity/api'
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import { IProcessState } from 'redux/api'
import { Loader } from 'forms/common/Loader'
import { MerchantListItem } from 'forms/merchant/components/MerchantListItem'
import { MerchantListMenu } from 'forms/merchant/components/MerchantListMenu'

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
    cardGrid: {}
  })

export interface BaseMerchantListProps {
  merchants: Array<IMerchant>
  process: IProcessState
  // classes: any
  onLoad(query: IMerchantsQuery): Promise<Array<IMerchant>>

  onDelete(id: string): Promise<void>
}

export class BaseMerchantList extends React.Component<BaseMerchantListProps & WithStyles<typeof styles>, {}> {
  state = {
    height: window.innerHeight
  }

  lastLoad = new Date().getTime()

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)

    this.props.onLoad({
      sort: 'created'
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= docHeight) {
      // On the bottom of the page!
      const now = new Date().getTime()
      if (!this.props.process.isLoading && now - this.lastLoad > 300) {
        this.props
          .onLoad({
            sort: 'created',
            after: this.props.merchants[this.props.merchants.length - 1].id
          })
          .then(() => (this.lastLoad = new Date().getTime()))
      }
    }
  }

  render() {
    const { classes, merchants, process } = this.props

    return (
      <div className={classes.root}>
        <MerchantListMenu />
        <Grid container spacing={16} className={classes.cardGrid}>
          {merchants &&
            merchants.map(val => (
              <Grid container item key={val.id} justify="center">
                <Grid item key={val.id} className={classes.cardWrapper}>
                  <MerchantListItem value={val} onDelete={this.props.onDelete} />
                </Grid>
              </Grid>
            ))}
        </Grid>
        {process && process.isLoading && <Loader style={{ height: merchants ? '64px' : '200px' }} />}
      </div>
    )
  }
}

export const MerchantList = withStyles(styles)(BaseMerchantList)
