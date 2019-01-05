import React, { Component } from "react"
import Grid from '@material-ui/core/Grid'
import API from "../../utils/API"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ResponsiveDrawer from "../../components/ResponsiveDrawer"
import Footer from "../Footer"
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  }
})

class Approved extends Component {
  state = {
    accounts: []
  }

  render() {

    const { classes } = this.props

    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

Approved.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Approved)