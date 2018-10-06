import * as React from 'react'

import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { IMerchant } from 'entity/api'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography'

const styles = () =>
  createStyles({
    root: {},
    avatar: {
      width: 128,
      height: 128
    },
    card: {},
    cardWrap: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
    cardTextBlock: {
      marginLeft: 16
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    name: {},
    email: {
      marginTop: 8
    },
    phone: {},
    created: {},
    menu: {
      marginLeft: 16
    },
  })

export interface BaseMerchantListItemProps {
  // classes: any
  value?: IMerchant
  onDelete(id: string): Promise<void>
}

export class BaseMerchantListItem extends React.Component<BaseMerchantListItemProps & WithStyles<typeof styles>, {}> {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleDelete = () => {
    this.handleClose()
    this.props.onDelete(this.props.value.id)
  }

  renderActionMenu = () => {
    const { classes } = this.props

    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={classes.menu}>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 200
            }
          }}
        >
          <MenuItem key={'Delete'} onClick={this.handleDelete}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    )
  }

  render() {
    const { classes, value } = this.props

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.cardWrap}>
              <Link to={'/merchants/' + value.id}>
                <Avatar src={value.avatarUrl} className={classes.avatar} />
              </Link>
              <div className={classes.cardTextBlock}>
                <div className={classes.title}>
                  <div>
                    <Link to={'/merchants/' + value.id}>
                      <Typography className={classes.name} variant="title" color="inherit" noWrap>
                        {value.firstname} {value.lastname}
                      </Typography>
                    </Link>
                  </div>
                  {this.renderActionMenu()}
                </div>

                <Typography className={classes.email} variant="subheading" color="inherit" noWrap>
                  {value.email}
                </Typography>
                <Typography className={classes.phone} variant="subheading" color="inherit" noWrap>
                  {value.phone}
                </Typography>
                <Typography className={classes.created} variant="body1" color="inherit" noWrap>
                  Created {value.created}
                </Typography>
                <div />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export const MerchantListItem = withStyles(styles)(BaseMerchantListItem)