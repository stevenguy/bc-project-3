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
    justifyContent: 'center'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250,
    padding: "0 10px"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  div: {
      flex: '100%'
  }
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
            <div className={classes.root}>
            <Button className={classes.div} onClick={this.createNew} color="primary">
                {this.state.newBtn}
            </Button>
            {this.props.isNew ?
                <React.Fragment>
                <FormControl  className={classes.formControl}>
                    <TextField
                        id="newName"
                        name="newName"
                        label="Account Name"
                        required
                        className={classes.textField}
                        value={this.state.newName}
                        onChange={this.handleNewChange}
                        margin="normal"
                        InputProps={{
                            form:'form1'
                            }}
                        >
                    </TextField>
                </FormControl>
                <FormControl  className={classes.formControl}>
                    <TextField
                        id="newNumber"
                        name="newNumber"
                        type="number"
                        label="Account Number"
                        required
                        className={classes.textField}
                        value={this.state.newNumber}
                        onChange={this.handleNewChange}
                        margin="normal"
                        InputProps={{
                            form:'form1'
                            }}
                        >
                    </TextField>
                </FormControl>
                <FormControl  className={classes.formControl}>
                    <TextField
                        id="newType"
                        name="newType"
                        label="Account Type"
                        required
                        className={classes.textField}
                        value={this.state.newType}
                        onChange={this.handleNewChange}
                        margin="normal"
                        InputProps={{
                            form:'form1'
                            }}
                        >
                    </TextField>
                </FormControl>
                </React.Fragment>
                : <React.Fragment>
                <FormControl  className={classes.formControl}>
                    <TextField
                        id="name"
                        name="name"
                        select
                        label="Account Name"
                        required
                        className={classes.textField}
                        value={this.state.accountID}
                        onChange={this.handleChange('accountID')}
                        InputProps={{
                            form:'form1'
                            }}
                        SelectProps={{
                            MenuProps: {
                            className: classes.formControl,
                            },
                        }}
                        margin="normal"
                        >
                        {this.props.accounts.sort(function(a,b){return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)}).map(account=> (
                           <MenuItem key={account._id} value={account._id}>{account.name}</MenuItem> 
                        ))}
                    </TextField>
                </FormControl>
                <FormControl  className={classes.formControl}>
                    <TextField
                        id="number"
                        select
                        name="number"
                        label="Account Number"
                        required
                        className={classes.textField}
                        value={this.state.accountID}
                        onChange={this.handleChange('accountID')}
                        InputProps={{
                            form:'form1'
                            }}
                        SelectProps={{
                            MenuProps: {
                            className: classes.formControl,
                            },
                        }}
                        margin="normal"
                        >
                        {this.props.accounts.sort(function(a, b){return a.number - b.number}).map(account => (
                           <MenuItem key={account._id} value={account._id}>{account.number}</MenuItem> 
                        ))}
                    </TextField>
                </FormControl>
                <FormControl  className={classes.formControl}>
                    <TextField
                        id="type"
                        label="Account Type"
                        name="type"
                        required
                        value={this.state.type}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            form:'form1',
                            readOnly: true
                        }}
                    />
                </FormControl>
                </React.Fragment>}
            </div>
        </React.Fragment>
          );
        }
      }
AccountForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountForm);