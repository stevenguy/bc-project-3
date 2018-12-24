import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import API from "../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  //Style goes here
 login: {
     height: '100vh',
     width: '100%',
     background: "rgb(4,4,32)",
     background: "linear-gradient(42deg, rgba(4,4,32,1) 0%, rgba(26,26,69,1) 32%, rgba(191,76,95,1) 59%, rgba(186,17,17,1) 100%)"
 },
 root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: "100%"
  },
  card: {
      height: "80%",
  },
  brand: {
    backgroundColor: "rgb(229, 115, 106)",
    color: 'rgb(236, 236, 238)',
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'center',
    backgroundColor: "rgb(46, 50, 68)",
    color: 'rgb(109, 112, 123)'
  },
  flex: {
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
  }
});

class Login extends Component {
    state = {
      //State goes here
    }
 
    render() {
      const { classes } = this.props;

      return (
        <React.Fragment>
        <Grid 
        container
        className={classes.login}
        justify="center"
        alignItems='center'
        >
            <Grid item className={classes.card} md={4}>
                <Paper square={true} className={classes.root + " " + classes.brand} elevation={10}>
                    <div className={classes.flex}>
                    <Typography color='inherit' variant="h1" component="h1">
                    Logo Here
                    </Typography>
                    <Typography color='inherit' variant='h3' component="h3">
                    Welcome to <br />
                    Web Accountant
                    </Typography>
                    </div>
                </Paper>
            </Grid>
            <Grid item className={classes.card} md={4}>
                <Paper square={true} className={classes.root + " " + classes.form} elevation={10}>
                <div className={classes.flex}>
                    <Typography color='inherit' variant="h1" component="h1">
                    Sign In
                    </Typography>
                    <Typography color='inherit' variant='h3' component="h3">
                    Sign In Form Here
                    </Typography>
                </div>
                </Paper>
            </Grid>
        </Grid>
        </React.Fragment>
          );
        }
      }
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);