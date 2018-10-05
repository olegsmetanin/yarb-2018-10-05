import * as React from 'react'

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
// import Grid from '@material-ui/core/Grid'
import { IMerchantCreateRequest } from 'entity/api'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      marginTop: 128,
      width: 'auto',
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    paper: {},
    form: {
      margin: 32
    },
    title: {
      textAlign: 'center',
      padding: 16
    },
    actionPanel: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    submit: {
      margin: 16
    }
  })

export interface BaseMerchantAddProps {
  classes: any
  onCreate(createRequest: IMerchantCreateRequest): Promise<string>
}

interface BaseMerchantAddState {
  merchant: IMerchantCreateRequest

  process: {
    isCreating: boolean
    errors: {
      [field: string]: string
    }
  }
}

export class BaseMerchantAdd extends React.Component<
  BaseMerchantAddProps & WithStyles<typeof styles>,
  BaseMerchantAddState
> {
  constructor(props) {
    super(props)
    this.state = {
      merchant: {
        firstname: '',
        lastname: '',
        avatarUrl: '',
        email: '',
        phone: ''
      },
      process: {
        isCreating: false,
        errors: {}
      }
    }
  }

  isValid: boolean = true

  onChange = e => {
    this.setState({
      merchant: { ...this.state.merchant, [e.target.name]: e.target.value }
    })
  }

  onBlur = () => {}

  onCreate = () => {
    if (this.isValid) {
      this.setState({ process: { ...this.state.process, isCreating: true } })
      this.props.onCreate(this.state.merchant).catch(error => {
        this.setState({
          process: {
            isCreating: false,
            errors: {
              ...this.state.process.errors,
              global: error
            }
          }
        })
      })
    }
  }

  render() {
    const { classes } = this.props
    const { merchant, process } = this.state

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Paper className={classes.paper} elevation={1}>
            <div className={classes.form}>
              <Typography className={classes.title} variant="title" color="inherit" noWrap>
                New merchant
              </Typography>
              <TextField
                required
                id="firstName"
                name="firstname"
                label="First name"
                fullWidth
                autoComplete="fname"
                value={merchant.firstname}
                error={!!process.errors['firstname']}
                onChange={this.onChange}
                onBlur={this.onBlur}
              />

              <TextField
                required
                id="lastName"
                name="lastname"
                label="Last name"
                fullWidth
                autoComplete="lname"
                value={merchant.lastname}
                error={!!process.errors['lastname']}
                onChange={this.onChange}
                onBlur={this.onBlur}
              />

              <TextField
                required
                id="email"
                name="email"
                label="e-mail"
                fullWidth
                autoComplete="email"
                value={merchant.email}
                onChange={this.onChange}
                error={!!process.errors['email']}
                onBlur={this.onBlur}
              />
              {process.errors['email'] || null}
              <TextField
                required
                id="phone"
                name="phone"
                label="phone"
                fullWidth
                autoComplete="phone"
                value={merchant.phone}
                error={!!process.errors['phone']}
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
              {process.errors['phone'] || null}
              <div className={classes.actionPanel}>
                <Button
                  type="submit"
                  fullWidth
                  variant="raised"
                  color="primary"
                  className={classes.submit}
                  onClick={this.onCreate}
                  disabled={process.isCreating}
                >
                  {process.isCreating ? 'Creating...' : 'Create'}
                </Button>
                {process.errors['global'] || null}
              </div>
            </div>
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

export const MerchantAdd = withStyles(styles)(BaseMerchantAdd)
