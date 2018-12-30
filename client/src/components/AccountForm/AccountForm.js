import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  //Style goes here
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250,
    padding: "0 10px"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class AccountForm extends Component {
    state = {
        name: '',
        number: '',
        newName: this.props.newAccount.name || '',
        newNumber: this.props.newAccount.number || '',
        newType: this.props.newAccount.type || '',
        type: this.props.account.type || '',
        labelWidth: 0,
        newBtn: "Create New Account",
        accountID: this.props.account._id || ''
    }

    handleChange = name => event => {
        let account = this.props.accounts.find(account => account._id === event.target.value )
        this.setState({ 
            [name]: event.target.value,
            type: account.type,
            name: account.name,
            number: account.number
        }, () => this.props.storeAccount(account))
    }

    handleNewChange = event => {
        let newAccount = {
            name: this.state.newName,
            number: this.state.newNumber,
            type: this.state.newType
        }
        this.setState({[event.target.name]: event.target.value}, 
            () => this.props.storeAccount(newAccount)
        )
    }
    
    createNew = event => {
      this.props.isNew 
      ? this.setState({newBtn: 'Create New Account'}, () => this.props.checkNew(false))
      : this.setState({newBtn: 'Select Existing Account'}, () => this.props.checkNew(true)) 
    }

    render() {
      const { classes } = this.props;

      return (
        <React.Fragment>
            <form className={classes.root} autoComplete="off">
            {this.props.isNew ?
                <React.Fragment>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="newName"
                        name="newName"
                        label="Account Name"
                        className={classes.textField}
                        value={this.state.newName}
                        onChange={this.handleNewChange}
                        margin="normal"
                        >
                    </TextField>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="newNumber"
                        name="newNumber"
                        label="Account Number"
                        className={classes.textField}
                        value={this.state.newNumber}
                        onChange={this.handleNewChange}
                        margin="normal"
                        >
                    </TextField>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="newType"
                        name="newType"
                        label="Account Type"
                        className={classes.textField}
                        value={this.state.newType}
                        onChange={this.handleNewChange}
                        margin="normal"
                        >
                    </TextField>
                </FormControl>
                </React.Fragment>
                : <React.Fragment>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="name"
                        name="name"
                        select
                        label="Account Name"
                        className={classes.textField}
                        value={this.state.accountID}
                        onChange={this.handleChange('accountID')}
                        SelectProps={{
                            MenuProps: {
                            className: classes.formControl,
                            },
                        }}
                        margin="normal"
                        >
                        {this.props.accounts.map(account=> (
                           <MenuItem key={account._id} value={account._id}>{account.name}</MenuItem> 
                        ))}
                    </TextField>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="number"
                        select
                        name="number"
                        label="Account Number"
                        className={classes.textField}
                        value={this.state.accountID}
                        onChange={this.handleChange('accountID')}
                        SelectProps={{
                            MenuProps: {
                            className: classes.formControl,
                            },
                        }}
                        margin="normal"
                        >
                        {this.props.accounts.map(account => (
                           <MenuItem key={account._id} value={account._id}>{account.number}</MenuItem> 
                        ))}
                    </TextField>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="type"
                        label="Account Type"
                        name="type"
                        value={this.state.type}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </FormControl>
                </React.Fragment>}
            </form>
            <Button onClick={this.createNew} color="primary">
            {this.state.newBtn}
          </Button>
        </React.Fragment>
          );
        }
      }
AccountForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountForm);