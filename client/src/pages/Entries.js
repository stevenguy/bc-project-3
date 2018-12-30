import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import AccountForm from "../components/AccountForm";
import Footer from "../components/Footer"
import Steppers from '../components/Steppers'
import Button from '@material-ui/core/Button'
import API from "../utils/API";


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
      account: {},
      entries: [],
      accounts: [],
      isNew: false,
      newAccount: {}
    }

    componentDidMount() {
      API.getAccount()
      .then(res => this.setState({ accounts: res.data }))
      .catch(err => console.log(err));
    }

    storeAccount = (data) => {
      if (this.state.isNew){
        this.setState({newAccount: data})
      } else {
        this.setState({account: data})
      }
    }

    isNew = (data) => {
      if (data) {
        this.setState({isNew: true})
      } else {
        this.setState({isNew: false})
      }
    }

    render() {
      const { classes } = this.props;

      return (
        <React.Fragment>
        <ResponsiveDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Steppers newAccount={this.state.newAccount} checkNew={this.isNew} isNew={this.state.isNew} validate={this.state.validate} account={this.state.account} accounts={this.state.accounts} storeAccount={this.storeAccount} />
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