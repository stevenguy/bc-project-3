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

class EntriesForm extends Component {
    state = {
      //State goes here
        name: '',
        number: '',
        type: '',
        labelWidth: 0
    }

    handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    };
    
    
    render() {
      const { classes } = this.props;

      return (
        <React.Fragment>
            <div>Entries Form</div>
            <form className={classes.root} autoComplete="off">
            {this.props.new ?
                <React.Fragment>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="name"
                        name="name"
                        label="Account Name"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange}
                        margin="normal"
                        >
                    </TextField>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="number"
                        name="number"
                        label="Account Number"
                        className={classes.textField}
                        value={this.state.number}
                        onChange={this.handleChange}
                        margin="normal"
                        >
                    </TextField>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="type"
                        name="type"
                        label="Account Type"
                        className={classes.textField}
                        value={this.state.type}
                        onChange={this.handleChange}
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
                        value={this.state.name}
                        onChange={this.handleChange}
                        SelectProps={{
                            MenuProps: {
                            className: classes.formControl,
                            },
                        }}
                        margin="normal"
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </TextField>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="number"
                        select
                        name="number"
                        label="Account Number"
                        className={classes.textField}
                        value={this.state.number}
                        onChange={this.handleChange}
                        SelectProps={{
                            MenuProps: {
                            className: classes.formControl,
                            },
                        }}
                        margin="normal"
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
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
        </React.Fragment>
          );
        }
      }
EntriesForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntriesForm);