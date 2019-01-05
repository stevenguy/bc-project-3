import React, { Component } from "react"
import Grid from '@material-ui/core/Grid'
import API from "../utils/API"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ResponsiveDrawer from "../components/ResponsiveDrawer"
import Footer from "../components/Footer"
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import Approved from '../components/Status/Approved'
import Unapproved from '../components/Status/Unapproved'
import Pending from '../components/Status/Pending'
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

const drawerWidth = 180

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  head: {
    backgroundColor: grey[300],
    color: theme.palette.common.white,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingBottom: '20px',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
})

const accounts = [
  {
    value: 1,
    label: 'Approved'
  },
  {
    value: 2,
    label: 'Unapproved'
  },
  {
    value: 3,
    label: 'Pending'
  }
]

class Dashboard extends Component {
  state = {
    reports: 'Select'
  }

  handleAccounts = fin => event => {
    this.setState({
      [fin]: event.target.value,
    })
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <ResponsiveDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Paper className="row">
            <form className={classes.container} noValidate autoComplete="off">

              <TextField
                id="accounts"
                select
                label="Journal Status"
                className={classes.textField}
                value={this.state.accounts}
                onChange={this.handleAccounts('accounts')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Journal Status"
                margin="normal"
                variant="outlined"
              >
                {accounts.map(a => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </TextField>
            </form>
          </Paper>
          {(() => {
            switch (this.state.accounts) {
              case 1:
                return <Approved />;
              case 2:
                return <Unapproved />;
              case 3:
                return <Pending />;
              default:
                return null;
            }
          })()}
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Dashboard)