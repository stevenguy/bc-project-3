import React, { Component } from "react";
// import API from "../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import AccountForm from "../components/AccountForm";
import Footer from "../components/Footer"
import Steppers from '../components/Steppers'
import Button from '@material-ui/core/Button'


const drawerWidth = 240;

const styles = theme => ({
  //Style goes here
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingBottom: '130px',
  }
});

class Entries extends Component {
    state = {
      //State goes here
      validate: false
    }

    handleValidate = (data) => {
      if (data.name && data.number && data.type) {
        this.setState({validate: true})
      } else {
        this.setState({validate: false})
      }
    }

    render() {
      const { classes } = this.props;

      return (
        <React.Fragment>
        <ResponsiveDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Steppers validate={this.state.validate} />
        </main>
        <Footer />
        </React.Fragment>
          );
        }
      }
Entries.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Entries);