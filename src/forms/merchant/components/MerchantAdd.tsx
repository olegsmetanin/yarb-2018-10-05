import * as React from 'react'

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
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

  onValidate(
    value: Partial<IMerchantCreateRequest>,
    fieldName?: string
  ): Promise<{ [P in keyof IMerchantCreateRequest]?: string }>
}

interface BaseMerchantAddState {
  merchant: IMerchantCreateRequest

  process: {
    isCreating: boolean
  }

  errors: Partial<IMerchantCreateRequest>
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
        isCreating: false
      },
      errors: {}
    }
  }

  handleOnChange = e => {
    this.setState({
      merchant: { ...this.state.merchant, [e.target.name]: e.target.value }
    })
  }

  handleOnCreate = () => {
    this.handleOnValidate()
      .then(() => {
        this.setState({ process: { isCreating: true } })
        this.props.onCreate(this.state.merchant).catch(errors => {
          this.setState({
            process: {
              isCreating: false
            },
            errors
          })
        })
      })
      .catch(() => {})
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

  render() {
    const { classes } = this.props
    const { merchant, process, errors } = this.state

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
                onChange={this.handleOnChange}
                onBlur={this.handleOnBlur}
                {...(errors.firstname ? { helperText: errors.firstname, error: true } : {})}
              />
              <TextField
                required
                id="lastName"
                name="lastname"
                label="Last name"
                fullWidth
                autoComplete="lname"
                value={merchant.lastname}
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
                value={merchant.email}
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
                value={merchant.phone}
                onChange={this.handleOnChange}
                onBlur={this.handleOnBlur}
                {...(errors.phone ? { helperText: errors.phone, error: true } : {})}
              />
              <div className={classes.actionPanel}>
                <Button
                  type="submit"
                  fullWidth
                  variant="raised"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleOnCreate}
                  disabled={process.isCreating}
                >
                  {process.isCreating ? 'Creating...' : 'Create'}
                </Button>
                {errors['global'] || null}
              </div>
            </div>
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

export const MerchantAdd = withStyles(styles)(BaseMerchantAdd)
