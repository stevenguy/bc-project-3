import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
// import API from "../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import HomeCard from "../components/Cards/home"
import CardMedia from '@material-ui/core/CardMedia';
import red from '@material-ui/core/colors/red';
import { Redirect } from "react-router";

const styles = theme => ({
  //Style goes here
 login: {
     height: 'auto',
     width: '100%',
     background: "linear-gradient(42deg, rgba(4,4,32,1) 0%, rgba(26,26,69,1) 32%, rgba(191,76,95,1) 59%, rgba(186,17,17,1) 100%)"
 },
 root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: "100%",
    [theme.breakpoints.down('xs')]: {
        maxHeight: "auto"
      },
  },
  card: {
    maxWidth: 400,
    height: "80%",
    [theme.breakpoints.down('xs')]: {
        height: "100%"
    }
  },
  brand: {
    backgroundColor: "rgb(229, 115, 106)",
    color: 'rgb(236, 236, 238)',
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  flex: {
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flexWrap: 'wrap',
    display: 'flex',
    width: '100%',
    color: 'white'
  },
  whiteText: {
      color: 'white',
  },
  cssLabel: {
      color: 'white !important',
    '&$cssFocused': {
      color: 'white',
    },
  },
  cssFocused: {
      color: 'white',
      borderColor: 'white',
  },
  cssUnderline: {
    '&:after': {
      borderBottomColor: 'white',
      color: 'white',
      borderColor: 'white',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: 'white',
    },
  },
  notchedOutline: {
      borderColor: 'rgb(109, 112, 123) !important',
  },
  button: {
      color: 'white',
      margin: '10px'
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Login extends Component {

 
    render() {
      const { classes } = this.props;

      return (
        <React.Fragment>

          {
            localStorage.getItem('user') ? (
              <Redirect to='/'/>
            ) : (
                <Redirect to="/login" />
              )
          }

        <Grid 
        container
        className={classes.login}
        
        alignItems='center'
        >
            
            
            <Grid item className={classes.card} xs={6}>
                <Paper square={true} className={classes.root + " " + classes.brand} elevation={10}>
                    
                    <CardMedia
                    className={classes.media}
                    image="../images/acctg_blue.png"
                    title="Paella dish"
                    color='inherit'
                    />
                    
                </Paper>
                <CardMedia
                    className={classes.media}
                    image="../images/acctg_blue.png"
                    title="Paella dish"
                    color='inherit'
                />
            
            </Grid>
            <Grid item className={classes.card} xs={6}>
                <Paper square={true} className={classes.root + " " + classes.brand} elevation={10}>
                    
                    <CardMedia
                    className={classes.media}
                    image="../images/acctg_blue.png"
                    title="Paella dish"
                    color='inherit'
                    />
                    
                </Paper>
                <CardMedia
                    className={classes.media}
                    image="../images/acctg_blue.png"
                    title="Paella dish"
                    color='inherit'
                />
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