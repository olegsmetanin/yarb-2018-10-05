import * as React from 'react'

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'
import AppBar from '@material-ui/core/AppBar'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import Toolbar from '@material-ui/core/Toolbar'
import { fade } from '@material-ui/core/styles/colorManipulator'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    appBar: {
      marginTop: 96
    },
    grow: {
      flexGrow: 1
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto'
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit',
      width: '100%'
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200
      }
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    }
  })

export interface BaseBidListMenuProps {
  // classes: any
}

export class BaseBidListMenu extends React.Component<BaseBidListMenuProps & WithStyles<typeof styles>, {}> {
  state = {
    anchorEl: null,
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  renderAddButton = () => {
    return (
      <IconButton color="inherit">
        <AddIcon />
      </IconButton>
    )
  }

  renderMobileMenu = () => {
    const { anchorEl } = this.state
    const isMenuOpen = Boolean(anchorEl)

    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem>
          {this.renderAddButton()}
          <p>New bid</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <DeleteIcon />
          </IconButton>
          <p>Delete bids</p>
        </MenuItem>
      </Menu>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color={'default'} className={classes.appBar}>
          <Toolbar variant="dense">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder="Search…"
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {this.renderAddButton()}
              <IconButton color="inherit">
                <DeleteIcon />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {this.renderMobileMenu()}
      </div>
    )
  }
}

export const BidListMenu = withStyles(styles)(BaseBidListMenu)
