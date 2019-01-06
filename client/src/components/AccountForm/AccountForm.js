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
    margin: 0,
    minWidth: 120,
    maxWidth: 150,
    padding: "0 10px",
    flexGrow: '1',
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
        newName: '',
        newNumber: '',
        newType: '',
        labelWidth: 0,
        newBtn: "Create New Account",
        accountID: '',
        isNew: false,
    }

    isNew = (data) => {
        if (data) {
          this.setState({isNew: true})
        } else {
          this.setState({isNew: false})
        }
    }

    createAccount = () => {
        if (this.props.accounts.find(account => account.name === this.state.newName) !== undefined ||
            this.props.accounts.find(account => account.number === this.state.newNumber) !== undefined) {
                console.log('Account already exist')
            } else {
                let newAccount = {
                    name: this.state.newName,
                    number: this.state.newNumber,
                    type: this.state.newType
                }
                this.props.createAccount(newAccount, this.props.entryIndex)
                this.setState({isNew: false, newBtn: "Create New Account"})
            }
    }

    handleChange = name => event => {
        console.log('here')
        let account = this.props.accounts.find(account => account._id === event.target.value )
        console.log(account)
          this.props.handleAccountChange(account, this.props.entryIndex)
    }

    handleNewChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    
    createNew = event => {
    console.log(this.props.entryIndex, this.props.entries)
      this.state.isNew 
      ? this.setState({newBtn: 'Create New Account'}, () => this.isNew(false))
      : this.setState({newBtn: 'Select Existing Account'}, () => this.isNew(true)) 
    }

    render() {
      const { classes } = this.props;

      return (
        <React.Fragment>
            <Button className={classes.div} onClick={this.createNew} color="primary">
                {this.state.newBtn}
            </Button>
            {this.state.isNew ?
                <React.Fragment>
                <FormControl  className={classes.formControl}>
                    <TextField
                        id="newName"
                        name="newName"
                        label="Name"
                        required
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
                        label="Number"
                        required
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
                        label="Type"
                        required
                        value={this.state.newType}
                        onChange={this.handleNewChange}
                        margin="normal"
                        InputProps={{
                            form:'form1'
                            }}
                        >
                    </TextField>
                </FormControl>
                <div className={classes.div}>
                <Button variant="contained" color="primary" onClick={this.createAccount}>
                    Create
                </Button>
                </div>
                </React.Fragment>
                : <React.Fragment>
                <FormControl  className={classes.formControl}>
                    <TextField
                        id="name"
                        name="name"
                        select
                        label="Name"
                        required
                        value={this.props.entries[this.props.entryIndex].account._id}
                        onChange={this.handleChange()}
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
                        label="Number"
                        required
                        value={this.props.entries[this.props.entryIndex].account._id}
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
                        label="Type"
                        name="type"
                        required
                        value={this.props.entries[this.props.entryIndex].account.type}
                        margin="normal"
                        fullWidth
                        InputProps={{
                            form:'form1',
                            readOnly: true,
                        }}
                    />
                </FormControl>
                </React.Fragment>}
        </React.Fragment>
          );
        }
      }
AccountForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountForm);