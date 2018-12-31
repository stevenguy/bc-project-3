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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';

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
  margin: {
    margin: theme.spacing.unit,
    alignSelf: 'center'
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
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell align='justify'>Account Name</TableCell>
                    <TableCell align="justify">Account Number</TableCell>
                    <TableCell align="justify">Account Type</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow> 
                        <TableCell align='justify'>{this.props.isNew ? this.props.newAccount.name : this.props.account.name}</TableCell>
                        <TableCell align="justify">{this.props.isNew ? this.props.newAccount.number : this.props.account.number}</TableCell>
                        <TableCell align="justify">{this.props.isNew ? this.props.newAccount.type : this.props.account.type}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div>
                {this.props.entries.map((entry, index) => (
                    <React.Fragment key={index}>
                    <div className={classes.root}>
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
                    <Fab size="small" color="secondary" aria-label="Add" onClick={this.props.handleRemove(index)} className={classes.margin}>
                        <RemoveIcon />
                    </Fab>
                </div>
                <Divider/>
                </React.Fragment>
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