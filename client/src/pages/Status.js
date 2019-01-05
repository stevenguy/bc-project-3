import React, { Component } from "react"
import Grid from '@material-ui/core/Grid'
import API from "../utils/API"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ResponsiveDrawer from "../components/ResponsiveDrawer"
import Footer from "../components/Footer"

const drawerWidth = 180

const styles = theme => ({
  //Style goes here
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  }
})

class Dashboard extends Component {
    state = {
      entries: {
        
      }
    }
 
    render() {
      const { classes } = this.props

      return (
        <React.Fragment>
        <ResponsiveDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph>
           This is Approved/Unapproved Entry Status Component
          </Typography>

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