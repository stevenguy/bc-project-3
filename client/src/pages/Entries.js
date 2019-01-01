import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Footer from "../components/Footer"
import Steppers from '../components/Steppers'
import API from "../utils/API";


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
    paddingBottom: '80px',
  }
});

class Entries extends Component {
    state = {
      //State goes here
      account: {},
      entries: [{date: new Date(), description:'', memo:'', amount:'', details:''}],
      accounts: [],
      isNew: false,
      newAccount: {},
    }

    componentDidMount() {
      API.getAccount()
      .then(res => {
        this.setState({ accounts: res.data })
      })
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

    handleDateChange = i => date => {
      let entries = [...this.state.entries]
      entries[i].date = date
      this.setState({ entries })
    }

    handleChange = i => event => {
      let entries = [...this.state.entries]
      entries[i][event.target.name] = event.target.value
      this.setState({ entries })
      };
  
      handleAdd = event => {
          this.setState({ entries: [...this.state.entries, {date: new Date(), description:'', memo:'', amount:'', details:''}] }) 
      };
  
      handleRemove = i => event => {
          let entries = [...this.state.entries]
          entries.splice(i,1)
          this.setState({ entries }) 
      };

      submitForm = () => {
        let entriesArr = []
        let account
        this.state.isNew ? account = this.state.newAccount : account = this.state.account
        for (let i = 0; i < this.state.entries.length; i++) {
          entriesArr.push({
            date: this.state.entries[i].date,
            account: account.number,
            description: account.name,
            type: account.type,
            transaction: this.state.entries[i].description,
            memo: this.state.entries[i].memo,
            details: this.state.entries[i].details,
            amount: this.state.entries[i].amount,
            preparer: 'Mearat',
            prepared_date: new Date(),
            status: 'Pending'
          })
        }
        API.saveTransaction(entriesArr)
      }

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
          submitForm={this.submitForm}
          selectedDate={this.state.selectedDate}
          handleDateChange={this.handleDateChange}
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