import * as React from 'react'

import { IBid, IBidsQuery } from 'entity/api'
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

// import { BidListMenu } from 'forms/bid/components/BidListMenu'
import { IProcessState } from 'redux/api'
import { Loader } from 'forms/common/Loader'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

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
    table: {}
  })

export interface BaseBidListProps {
  merchantId: string
  bids: Array<IBid>

  query: IBidsQuery
  process: IProcessState
  // classes: any
  onLoad(query: IBidsQuery): Promise<Array<IBid>>
}

export interface BaseBidListState {
  height: number
}

export class BaseBidList extends React.Component<BaseBidListProps & WithStyles<typeof styles>, BaseBidListState> {
  constructor(props) {
    super(props)
    this.state = {
      height: window.innerHeight
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    if (!this.props.query || this.props.query.merchantId !== this.props.merchantId) {
      this.props.onLoad({
        merchantId: this.props.merchantId,
        sort: 'created'
      })
    }
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
      if (!this.props.process.isLoading) {
        this.props.onLoad({
          merchantId: this.props.merchantId,
          sort: 'created',
          after: this.props.bids[this.props.bids.length - 1].id
        })
      }
    }
  }

  bidsIsVisible = () => {
    return this.props.query && this.props.query.merchantId === this.props.merchantId && this.props.bids
  }

  render() {
    const { classes, bids, process } = this.props
    // <BidListMenu />
    return (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell numeric>Car title</TableCell>
              <TableCell numeric>Amount</TableCell>
              <TableCell numeric>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <React.Fragment>
              {this.bidsIsVisible() &&
                bids.map(bid => {
                  return (
                    <TableRow key={bid.id}>
                      <TableCell component="th" scope="row">
                        {bid.id}
                      </TableCell>
                      <TableCell numeric>{bid.carTitle}</TableCell>
                      <TableCell numeric>{bid.amount}</TableCell>
                      <TableCell numeric>{bid.created}</TableCell>
                    </TableRow>
                  )
                })}
            </React.Fragment>
          </TableBody>
        </Table>
        {process && process.isLoading && <Loader style={{ height: bids ? '64px' : '200px' }} />}
      </div>
    )
  }
}

export const BidList = withStyles(styles)(BaseBidList)
