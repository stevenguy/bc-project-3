import React, { Component } from "react";
import ResponsiveDrawer from "../ResponsiveDrawer";
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';
import BalanceMonth from "../CompareReports/balancemonth";
import BalanceQuarter from "../CompareReports/balancequarter";
import BalanceYear from "../CompareReports/balanceyear";

const drawerWidth = 180;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  head: {
    backgroundColor: grey[300],
    color: theme.palette.common.white,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingBottom: '20px',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

const compare = [
  {
    value: 0,
    label: '',
  },
  {
    value: 1,
    label: 'Year',
  },
  {
    value: 2,
    label: 'Quarter',
  },
  {
    value: 3,
    label: 'Month',
  }
];

class CompareBalance extends Component {

  state = {
    combalance: 0,
  };

  handleCompare = compare => event => {
    this.setState({
      [compare]: event.target.value,
    });
  };
  
  render() {
    
    const { classes } = this.props;

    return (

      <React.Fragment>
      <ResponsiveDrawer />
      <div style={ { height: 10 } }></div>
      <Paper className="row">

        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="combalance"
            select
            label="Compare"
            className={classes.textField}
            value={this.state.combalance}
            onChange={this.handleCompare('combalance')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Compare Selection"
            margin="normal"
            variant="outlined"
          >
            {compare.map(c => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </TextField>
        </form>
        </Paper>
        {(() => {
            switch(this.state.combalance) {
              case 1: 
                return <BalanceYear/>;
              case 2: 
                return <BalanceQuarter/>;
              case 3: 
                return <BalanceMonth/>;
              default:
                return null;
            }
        })()}
        </React.Fragment>
    );
  }
}

CompareBalance.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompareBalance);