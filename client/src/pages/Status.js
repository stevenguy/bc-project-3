import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import API from "../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Footer from "../components/Footer"


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

class Dashboard extends Component {
    state = {
      //State goes here
      data: []
    }
    
    componentDidMount() {
      API.getJournals()
      .then(res => {
        res.data.map((data) => {
          data.transaction_docs.map((data) => {
           data.date = new Date(data.date)
          })
        })
        this.setState({data: res.data})
      })
      .catch(err => console.log(err));
    }

    render() {
      const { classes } = this.props;

      return (
        <React.Fragment>
        <ResponsiveDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph>
           This is Approved/Unapproved Entry Status Component
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
          );
        }
      }
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);