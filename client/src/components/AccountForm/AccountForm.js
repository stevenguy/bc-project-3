import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  //Style goes here
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  formControl: {
    minWidth: '120px',
    padding: "0 10px",
    [theme.breakpoints.down('sm')]: {
        minWidth: '50%',
      }
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  div: {
      flex: '100%',
  },
  chip: {
    margin: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  test: {
    padding: "0 10px",
    [theme.breakpoints.down('sm')]: {
        width: '50%',
      }
  },
  textField: {
    width: '100px',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
      }
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
        errorMsg: ''
    }

    isNew = (data) => {
        if (data) {
          this.setState({isNew: true})
        } else {
          this.setState({isNew: false})
        }
    }

    createAccount = () => {
        if (!this.state.newName || !this.state.newNumber || !this.state.newType) {
            this.setState({errorMsg: "Please input all required fields"})
        }
        else if (this.props.accounts.find(account => account.name === this.state.newName) !== undefined ||
            this.props.accounts.find(account => account.number === this.state.newNumber) !== undefined) {
                this.setState({errorMsg: "Account Already Exist!"})
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
        let account = this.props.accounts.find(account => account._id === event.target.value )
          this.props.handleAccountChange(account, this.props.entryIndex)
    }

    handleNewChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    
    createNew = event => {
      this.state.isNew 
      ? this.setState({newBtn: 'Create New Account'}, () => this.isNew(false))
      : this.setState({newBtn: 'Select Existing Account', errorMsg: ''}, () => this.isNew(true)) 
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
                        className={classes.textField}
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
                {this.state.errorMsg 
                ? <Chip
                icon={<ErrorIcon />}
                label={this.state.errorMsg}
                className={classes.chip}
                color="secondary"
                variant="outlined"
                />: null}
                <div className={classes.div}>
                <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={this.createAccount}>
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
                <FormControl  className={classes.test}>
                    <TextField
                        id="type"
                        label="Type"
                        name="type"
                        margin='normal'
                        className={classes.textField}
                        required
                        value={this.props.entries[this.props.entryIndex].account.type}
                        margin="normal"
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