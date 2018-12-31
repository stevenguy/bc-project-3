import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Footer from "../components/Footer"
import Steppers from '../components/Steppers'
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
      entries: [{description:'', memo:'', amount:'', details:''}],
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

    handleChange = i => event => {
      let entries = [...this.state.entries]
      entries[i][event.target.name] = event.target.value
      this.setState({ entries })
      };
  
      handleAdd = event => {
          console.log('Clicked')
          this.setState({ entries: [...this.state.entries, {description:'', memo:'', amount:'', details:''}] }) 
      };
  
      handleRemove = i => event => {
          console.log('Remove')
          let entries = [...this.state.entries]
          entries.splice(i,1)
          this.setState({ entries }) 
      };

    render() {
      const { classes } = this.props;

      return (
        <React.Fragment>
        <ResponsiveDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Steppers 
          newAccount={this.state.newAccount} 
          checkNew={this.isNew} 
          isNew={this.state.isNew} 
          validate={this.state.validate} 
          account={this.state.account} 
          accounts={this.state.accounts} 
          storeAccount={this.storeAccount}
          entries={this.state.entries}
          handleChange={this.handleChange}
          handleAdd={this.handleAdd}
          handleRemove={this.handleRemove}
           />
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