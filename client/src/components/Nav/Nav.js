import React, { Component } from 'react';
import "./Nav.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch, Route, Redirect, Link  } from "react-router-dom";


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: "15px",
    [theme.breakpoints.down('sm')]: {
      marginBottom: "20px"
     }
  },
  rightToolbar: {
    marginLeft: 'auto',
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
     textAlign: 'center'
    }
  },
  appName: {
    alignItems: 'center',
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  }
});

class Nav extends Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };


render () {

    const { classes, theme } = this.props;

    return (
    <div className={classes.root}>
      <AppBar position="relative" color="default">
        <Toolbar>
      <Grid 
      container
      direction="row"
      justify="space-between"
      alignItems="center">
      <Grid item xs={12} sm={4}>
        <Tabs
            className={classes.appName}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab
              label="Home"
              component={Link} to="/"
              />
              
            <Tab 
              label= "Saved"
              component={Link} to="/saved"
              />
        </Tabs>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography className={classes.rightToolbar} variant="h6" color="inherit">
        <p>Google Books API</p>
        </Typography>
      </Grid>
      </Grid>
        </Toolbar>
      </AppBar>
    </div>
    )
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);