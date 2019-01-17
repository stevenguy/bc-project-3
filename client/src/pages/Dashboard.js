import React, { Component } from "react";
import API from "../utils/API";
import PropTypes, { element } from 'prop-types';
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
import { Title, Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";


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
    paddingTop: '80px',
    paddingBottom: '80px'
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
    revenue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    revenueGraph:
      [{ month: 'Jan', make: 0 },
      { month: 'Feb', make: 0 },
      { month: 'Mar', make: 0 },
      { month: 'Apr', make: 0 },
      { month: 'May', make: 0 },
      { month: 'Jun', make: 0 },
      { month: 'Jul', make: 0 },
      { month: 'Aug', make: 0 },
      { month: 'Sep', make: 0 },
      { month: 'Oct', make: 0 },
      { month: 'Nov', make: 0 },
      { month: 'Dec', make: 0 }],

    expenseGraph:
      [{ month: 'Jan', make: 0 },
      { month: 'Feb', make: 0 },
      { month: 'Mar', make: 0 },
      { month: 'Apr', make: 0 },
      { month: 'May', make: 0 },
      { month: 'Jun', make: 0 },
      { month: 'Jul', make: 0 },
      { month: 'Aug', make: 0 },
      { month: 'Sep', make: 0 },
      { month: 'Oct', make: 0 },
      { month: 'Nov', make: 0 },
      { month: 'Dec', make: 0 }]
  }

  componentDidMount() {
    API.typemonth()
      .then((res) => {
        console.log('string')
        console.log(res)
        var _revenue = this.state.revenue;
        var _expense = this.state.expense;
        var _revenueGraph = this.state.revenueGraph;
        var _expenseGraph = this.state.expenseGraph;
        res.data.forEach(element => {
          console.log(element)
          switch (element._id.type) {
            case 'Revenue':
              _revenue[element._id.month - 1] += element.amount
              break
            case 'Expenses':
              _expense[element._id.month - 1] += element.amount
          }
        })
        for (var i = 0; i < this.state.revenue.length; i++) {
          _revenueGraph[i].make = _revenue[i]
          _expenseGraph[i].make = _expense[i]
        }
        this.setState({ revenue: _revenue, expense: _expense, revenueGraph: _revenueGraph, expenseGraph: _expenseGraph })
        console.log(_revenue)
        console.log(_expense)
        console.log(_revenueGraph)
        console.log(_expenseGraph)
        console.log(this.state)
      })
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
                  icon={<DoneAllIcon className={classes.icon} />}
                  text='Create a new Journal Entry or check to see if existing entries are Approved/Unapproved'
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <DashboardCard
                  title='Search Journal Entries'
                  path='Search'
                  icon={<SearchIcon className={classes.icon} />}
                  text='Search for a journal entry by ID number, Preparer, or Approver'
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <DashboardCard
                  title='Run Reports'
                  path='Reports'
                  icon={<DirectionsRunIcon className={classes.icon} />}
                  text='Run dem Reports'
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <DashboardCard
                  title='Upload Transactions'
                  path='Upload'
                  icon={<CloudUploadIcon className={classes.icon} />}
                  text='Upload new transactions via CSV file'
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={6} md={12} sm={12} xs={12} >
                <Chart
                  data={this.state.expenseGraph}
                >
                  <Title text='Expenses' />
                  <ArgumentAxis />
                  <ValueAxis />
                  <LineSeries valueField="make" argumentField="month" />
                </Chart>
              </Grid>

              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Chart
                  data={this.state.revenueGraph}
                >
                  <Title text='Revenue' />
                  <ArgumentAxis />
                  <ValueAxis />
                  <LineSeries valueField="make" argumentField="month" />
                </Chart>
              </Grid>
            </Grid>
          </main>
          <Footer />
        </React.Fragment>
        }
          </React.Fragment>
    )
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);