import * as React from 'react'

import { IMerchant, IMerchantQuery } from 'entity/api'
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import { IProcessState } from 'redux/api'
import IconButton from '@material-ui/core/IconButton'
import { Loader } from 'forms/common/Loader'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const styles = (theme: Theme) =>
  createStyles({
    root: {
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
    paper: {},
    menu: {},
    avatar: {
      width: 128,
      height: 128
    },
    card: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    form: {
      margin: 16
    },
    actionPanel: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    submit: {
      margin: 16
    },
    merchantTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    name: {},
    email: {},
    phone: {},
    created: {},
  })

export interface BaseMerchantViewProps {
  merchantId: string
  merchant: IMerchant

  state: IProcessState
  // classes: any
  onLoad(query: IMerchantQuery): Promise<IMerchant>
  onSave(value: IMerchant): Promise<void>

  onDelete(id: string): Promise<void>
}

interface BaseMerchantViewState {
  merchant: IMerchant
  isDirty: boolean

  anchorEl?: HTMLElement
}

export class BaseMerchantView extends React.Component<
  BaseMerchantViewProps & WithStyles<typeof styles>,
  BaseMerchantViewState
> {
  constructor(props) {
    super(props)
    this.state = this.init(props)
  }

  componentDidMount() {
    const { merchant } = this.props
    if (!merchant || merchant.id !== this.props.merchantId) {
      this.props.onLoad({
        merchantId: this.props.merchantId
      })
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.merchant && !newProps.state.isSaving) {
      this.setState(this.init(newProps))
    }
  }

  init = newProps => ({
    merchant: newProps.merchant ? JSON.parse(JSON.stringify(newProps.merchant)) : null,
    isDirty: false
  })

  onChange = e => {
    this.setState({
      merchant: { ...this.state.merchant, [e.target.name]: e.target.value },
      isDirty: true
    })
  }

  onSave = () => {
    this.props.onSave(this.state.merchant)
  }

  onCancel = () => {
    this.setState(this.init(this.props))
  }

  handleOpenMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleCloseMenu = () => {
    this.setState({ anchorEl: null })
  }

  handleDelete = () => {
    this.props.onDelete(this.props.merchant.id)
  }

  renderActionButton = () => {
    const { classes } = this.props

    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={classes.menu}>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleCloseMenu}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 200
            }
          }}
        >
          <MenuItem key={'delete'} onClick={this.handleDelete}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    )
  }

  render() {
    const { classes, state, merchant: orig_merchant } = this.props
    const { merchant, isDirty } = this.state

    if (state && (state.isLoading || state.isDeleting)) {
      return (
        <div className={classes.root}>
          <Loader />
        </div>
      )
    }

    if (orig_merchant && merchant) {
      return (
        <React.Fragment>
          <div className={classes.root}>
            <Paper className={classes.paper} elevation={1}>
              <Grid container spacing={24}>
                <Grid item key={'left'} xs={12} sm={6}>
                  <div className={classes.card}>
                    <Avatar src={merchant.avatarUrl} className={classes.avatar} />
                    <div className={classes.merchantTitle}>
                      <Typography className={classes.name} variant="title" color="inherit" noWrap>
                        {orig_merchant.firstname} {orig_merchant.lastname}
                      </Typography>
                      {this.renderActionButton()}
                    </div>
                    <Typography className={classes.email} variant="subheading" color="inherit" noWrap>
                      {orig_merchant.email}
                    </Typography>
                    <Typography className={classes.phone} variant="subheading" color="inherit" noWrap>
                      {orig_merchant.phone}
                    </Typography>
                    <Typography className={classes.created} variant="body1" color="inherit" noWrap>
                      Created {orig_merchant.created}
                    </Typography>
                  </div>
                </Grid>
                <Grid item key={'right'} xs={12} sm={6}>
                  <div className={classes.form}>
                    <TextField
                      required
                      id="firstName"
                      name="firstname"
                      label="First name"
                      fullWidth
                      autoComplete="fname"
                      value={this.state.merchant.firstname}
                      onChange={this.onChange}
                    />

                    <TextField
                      required
                      id="lastName"
                      name="lastname"
                      label="Last name"
                      fullWidth
                      autoComplete="lname"
                      value={this.state.merchant.lastname}
                      onChange={this.onChange}
                    />

                    <TextField
                      required
                      id="email"
                      name="email"
                      label="e-mail"
                      fullWidth
                      autoComplete="email"
                      value={this.state.merchant.email}
                      onChange={this.onChange}
                    />

                    <TextField
                      required
                      id="phone"
                      name="phone"
                      label="phone"
                      fullWidth
                      autoComplete="phone"
                      value={this.state.merchant.phone}
                      onChange={this.onChange}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          name="hasPremium"
                          checked={this.state.merchant.hasPremium}
                          onChange={this.onChange}
                        />
                      }
                      label="Has Premium"
                    />
                    {isDirty && (
                      <div className={classes.actionPanel}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="raised"
                          color="primary"
                          className={classes.submit}
                          onClick={this.onSave}
                          disabled={state.isSaving}
                        >
                          {state.isSaving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          className={classes.submit}
                          onClick={this.onCancel}
                          disabled={state.isSaving}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </React.Fragment>
      )
    }

    return null
  }
}

export const MerchantOverview = withStyles(styles)(BaseMerchantView)
