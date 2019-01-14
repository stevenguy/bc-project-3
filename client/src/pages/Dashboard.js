import React, { Component } from "react";
// import API from "../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Footer from "../components/Footer";
import { Redirect } from "react-router";
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
  }
});

var local = JSON.parse(localStorage.getItem('user'));

class Dashboard extends Component {
  state = {

  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
      {!local.password ? <Redirect to={{pathname: '/register'
    }} /> :
      <React.Fragment>
          <Notifications />
          <ResponsiveDrawer />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph>
              This is Dashboard Component
          </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
              consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus
              sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
              In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
              et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique
              sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo
              viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
              ultrices sagittis orci a.
          </Typography>
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