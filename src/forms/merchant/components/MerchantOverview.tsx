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
    created: {}
  })

export interface BaseMerchantViewProps {
  merchantId: string
  merchant: IMerchant

  process: IProcessState
  // classes: any
  onLoad(query: IMerchantQuery): Promise<IMerchant>

  onSave(value: IMerchant): Promise<void>

  onDelete(id: string): Promise<void>

  onValidate(value: Partial<IMerchant>, fieldName?: string): Promise<{ [P in keyof IMerchant]?: string }>
}

interface BaseMerchantViewState {
  merchant: IMerchant
  isDirty: boolean

  anchorEl?: HTMLElement

  errors: Partial<IMerchant>
}

export class BaseMerchantView extends React.Component<
  BaseMerchantViewProps & WithStyles<typeof styles>,
  BaseMerchantViewState
> {
  constructor(props) {
    super(props)
    this.state = this.initState(props)
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
    if (newProps.merchant && !newProps.process.isSaving) {
      this.setState(this.initState(newProps))
    }
  }

  initState = newProps => ({
    merchant: newProps.merchant ? JSON.parse(JSON.stringify(newProps.merchant)) : null,
    isDirty: false,
    errors: {}
  })

  handleOnChange = e => {
    this.setState({
      merchant: { ...this.state.merchant, [e.target.name]: e.target.value },
      isDirty: true
    })
  }

  handleOnSave = () => {
    this.handleOnValidate()
      .then(() => this.props.onSave(this.state.merchant))
      .catch(() => {})
  }

  handleOnCancel = () => {
    this.setState(this.initState(this.props))
  }

  handleOnValidate = (fieldName?: string) => {
    return this.props
      .onValidate(this.state.merchant, fieldName)
      .then(() => this.setState(prev => ({ errors: { ...prev.errors, [fieldName]: null } })))
      .catch(errors => {
        this.setState(prev => ({ ...prev, errors: { ...prev.errors, ...errors } }))
        throw errors
      })
  }

  handleOnBlur = e => {
    this.handleOnValidate(e.target.name).catch(() => {})
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
    const { classes, process, merchant: orig_merchant } = this.props
    const { merchant, isDirty, errors } = this.state

    if (process && (process.isLoading || process.isDeleting)) {
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
                      id="firstname"
                      name="firstname"
                      label="First name"
                      fullWidth
                      autoComplete="fname"
                      value={this.state.merchant.firstname}
                      onChange={this.handleOnChange}
                      onBlur={this.handleOnBlur}
                      {...(errors.firstname ? { helperText: errors.firstname, error: true } : {})}
                    />
                    <TextField
                      required
                      id="lastname"
                      name="lastname"
                      label="Last name"
                      fullWidth
                      autoComplete="lname"
                      value={this.state.merchant.lastname}
                      onChange={this.handleOnChange}
                      onBlur={this.handleOnBlur}
                      {...(errors.lastname ? { helperText: errors.lastname, error: true } : {})}
                    />
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="e-mail"
                      fullWidth
                      autoComplete="email"
                      value={this.state.merchant.email}
                      onChange={this.handleOnChange}
                      onBlur={this.handleOnBlur}
                      {...(errors.email ? { helperText: errors.email, error: true } : {})}
                    />
                    <TextField
                      required
                      id="phone"
                      name="phone"
                      label="phone"
                      fullWidth
                      autoComplete="phone"
                      value={this.state.merchant.phone}
                      onChange={this.handleOnChange}
                      onBlur={this.handleOnBlur}
                      {...(errors.phone ? { helperText: errors.phone, error: true } : {})}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          name="hasPremium"
                          checked={this.state.merchant.hasPremium}
                          onChange={this.handleOnChange}
                          onBlur={this.handleOnBlur}
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
                          onClick={this.handleOnSave}
                          disabled={process.isSaving}
                        >
                          {process.isSaving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          className={classes.submit}
                          onClick={this.handleOnCancel}
                          disabled={process.isSaving}
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
