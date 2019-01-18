import React, { Component } from "react";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Footer from "../components/Footer"
import Userinfo from "../components/UserInfo"
import Auth from "../utils/user";
import { Redirect } from "react-router";
import Notifications from "../components/Notifications"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 180;

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingBottom: '80px',
  }
});

var local = JSON.parse(localStorage.getItem('user'));

class Admin extends Component {
  state = {
    accounts: []
  }

  assignRole = (id, role) => {
    var roleInfo = this.findAccount(id);
    roleInfo.role = role;
    Auth.updateUser(roleInfo)
      .then(res => {
        console.log(res.data)
        this.forceUpdate()
      })
      .catch(err => console.log(err));

  }

  findAccount = id => {
    for (var i = 0; i < this.state.accounts.length; i++) {
      if (this.state.accounts[i]._id == id) {
        return this.state.accounts[i]
      }
    }
  }

  componentDidMount() {
    Auth.getUser()
      .then(res => {
        console.log(res.data);
        var temp = res.data;
        this.state.accounts = temp;
        this.forceUpdate();
      })
      .catch(err => console.log(err));
  }

  
  

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Notifications />
        <ResponsiveDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
        <Grid
            container
            spacing={24}
            alignItems="center"
            style={{}}
        >

        {(local == null || local.role != 'Admin') ? <Redirect to='/' /> : ''}


          {!this.state.accounts.length ? (<h1>No new pending users</h1>)
            :
            (this.state.accounts.map((stuff, index) => {

              return (stuff.role != 'Admin' ?
              <Userinfo
                _id={stuff._id}
                photoURL={stuff.photoURL}
                name={stuff.name}
                email={stuff.email}
                role={stuff.role}
                clicked={this.assignRole}
              />
                : <h1></h1>
                );
              })
              )
            }
        </Grid>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);