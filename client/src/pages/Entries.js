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
      entries: [{date: new Date(), description:'', memo:'', amount:'', details:'', account:{
        _id:'', name:'', number:'', type:''
      }}],
      accounts: []
    }

    componentDidMount() {
      API.getAccount()
      .then(res => {
        this.setState({ accounts: res.data })
      })
      .catch(err => console.log(err));
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
        this.setState({ 
          entries: [...this.state.entries, 
          {date: new Date(), description:'', memo:'', amount:'', details:'', account:{_id:'', name:'', number:'', type:''} }]
        }) 
    };

    handleRemove = i => event => {
        let entries = [...this.state.entries]
        entries.splice(i,1)
        this.setState({ entries }) 
    };

    handleAccountChange = (account, index) => {
      let entries = [...this.state.entries]
      entries[index].account = account
      this.setState({ entries })
    }

    createAccount = (account, index) => {
        console.log(account)
        API.newAccount(account)
        .then((createdAccount) => {
          console.log(createdAccount.data._id)
          let entries = [...this.state.entries]
          entries[index].account = {
            _id: createdAccount.data._id,
            name: createdAccount.data.name,
            number: createdAccount.data.number,
            type: createdAccount.data.type,
          }
          this.setState({ entries })
          return API.getAccount()
        })
        .then(res => {
          this.setState({ accounts: res.data })
        })
    }

    submitForm = () => {
      let entriesArr = []
      API.newJournal({createdBy: 'Mearat'})
      .then((journal) => {
        console.log(journal)
        for (let i = 0; i < this.state.entries.length; i++) {
          entriesArr.push({
            date: this.state.entries[i].date,
            account: this.state.entries[i].account.number,
            description: this.state.entries[i].account.name,
            type: this.state.entries[i].account.type,
            transaction: this.state.entries[i].description,
            memo: this.state.entries[i].memo,
            details: this.state.entries[i].details,
            amount: this.state.entries[i].amount,
            //Need to update the praparer to pull from local storage once the user features set up
            preparer: 'Mearat',
            prepared_date: new Date(),
            status: 'Pending',
            year: this.state.entries[i].date.getFullYear(),
            month: this.state.entries[i].date.getMonth(),
            quarter: Math.floor(this.state.entries[i].date.getMonth()/3) + 1,
            journal: journal.data._id
          })
        }
        return API.saveTransaction(entriesArr)
      })
      .then(() => API.getAccount())
      .then((res) => {
        this.setState({
          accounts: res.data,
          entries: [{date: new Date(), description:'', memo:'', amount:'', details:'', account:{_id:'', name:'', number:'', type:''}}],
        })
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
          <Steppers 
          newAccount={this.state.newAccount} 
          isNew={this.state.isNew} 
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
          handleAccountChange={this.handleAccountChange}
          createAccount={this.createAccount}
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