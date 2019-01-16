import React, { Component } from "react";
// import API from "../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Footer from "../components/Footer";
import { Redirect } from "react-router";
import DashboardCard from "../components/Cards/dashboardCard"
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import Notifications from "../components/Notifications"

const drawerWidth = 180;

const styles = theme => ({
  //Style goes here
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  icon: {
    width: '100px',
    height: '100px',
    marginTop: '30px'
  },
});

var local = JSON.parse(localStorage.getItem('user'));

class Dashboard extends Component {
  state = {

  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
      {/* {!local.password ? <Redirect to={{pathname: '/register'
    }} /> : */}
      <React.Fragment>
          <Notifications />
          <ResponsiveDrawer />
          <main className={classes.content}>
            <div className={classes.toolbar} />
          <Grid container spacing={8}>
            <Grid item lg={3} sm={6} xs={12}>
              <DashboardCard 
                  title='Approved/Unapproved Journal Entries' 
                  path='Entries' 
                  icon={<DoneAllIcon className={classes.icon}/>}
                  text= 'Create a new Journal Entry or check to see if existing entries are Approved/Unapproved'
              />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <DashboardCard 
                  title='Search Journal Entries' 
                  path='Search' 
                  icon={<SearchIcon className={classes.icon}/>}
                  text='Search for a journal entry by Journal ID, Preparer, or Approver'
              />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <DashboardCard 
                  title='Run Reports' 
                  path='Reports' 
                  icon={<DirectionsRunIcon className={classes.icon}/>}
                  text='Run monthly, quarterly, and yearly financial reports'
              />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <DashboardCard 
                  title='Upload Transactions' 
                  path='Upload' 
                  icon={<CloudUploadIcon className={classes.icon}/>}
                  text='Upload new transactions via CSV file'
              />
            </Grid>
          </Grid>
          </main>
          <Footer />
          </React.Fragment>
        }
          </React.Fragment>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);