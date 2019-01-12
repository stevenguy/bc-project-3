import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import AccountForm from './AccountForm'
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  //Style goes here
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  formControl: {
    margin: 0,
    maxWidth: 150,
    minWidth: 100,
    padding: "0 10px",
    flexGrow: '1'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
    alignSelf: 'center',
    [theme.breakpoints.down('xs')]: {
        flex: '100%'
      }
  }
});

class EntriesForm extends Component {
    state = {
      //State goes here
        labelWidth: 0,
    }

    render() {
      const { classes } = this.props;

      return (
        <React.Fragment>
            <div>
                {this.props.entries.map((entry, index) => (
                    <Paper key={index}>
                    <div className={classes.root}>
                    <AccountForm
                        entries={this.props.entries}
                        accounts= {this.props.accounts} 
                        createAccount= {this.props.createAccount}
                        account={this.props.entries[index].account}
                        handleChange={this.props.handleChange}
                        entryIndex={index}
                        handleAccountChange={this.props.handleAccountChange} 
                    />
                    <FormControl className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        id='date'
                        margin="normal"
                        label="Date"
                        format='MM/dd/yy'
                        value={this.props.entries[index].date}
                        onChange={this.props.handleDateChange(index)}
                    />
                    </MuiPickersUtilsProvider>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            required
                            className={classes.textField}
                            value={this.props.entries[index].description}
                            onChange={this.props.handleChange(index)}
                            margin="normal"
                            >
                        </TextField>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="memo"
                            name="memo"
                            label="Memo"
                            className={classes.textField}
                            value={this.props.entries[index].memo}
                            onChange={this.props.handleChange(index)}
                            margin="normal"
                            >
                        </TextField>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="details"
                            select
                            name="details"
                            label="Details"
                            required
                            className={classes.textField}
                            value={this.props.entries[index].details}
                            onChange={this.props.handleChange(index)}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.formControl,
                                },
                            }}
                            margin="normal"
                            >
                            <MenuItem value='Debit'>Debit</MenuItem>
                            <MenuItem value='Credit'>Credit</MenuItem>
                        </TextField>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="amount"
                            name="amount"
                            label="Amount"
                            type="Number"
                            required
                            className={classes.textField}
                            value={this.props.entries[index].amount}
                            onChange={this.props.handleChange(index)}
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                )}}
                            >
                        </TextField>
                    </FormControl>
                    <div className={classes.margin}>
                    <Fab size="small" color="secondary" aria-label="Remove" onClick={this.props.handleRemove(index)}>
                        <RemoveIcon />
                    </Fab>
                    </div>
                </div>
                <Divider/>
                </Paper>
                ))}
            <Fab size="small" color="primary" aria-label="Add" onClick={this.props.handleAdd} className={classes.margin}>
                <AddIcon />
            </Fab>
            </div>
        </React.Fragment>
          );
        }
      }
EntriesForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntriesForm);