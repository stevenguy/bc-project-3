import React, { Component } from "react";
import Footer from "../components/Footer";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';
import BalanceSheet from '../components/Tables/balancesheet';
import IncomeStatement from '../components/Tables/incomestatement';
import AccountDetail from '../components/Tables/accounts';
import CompareIncome from '../components/Tables/compareincome';
import CompareBalance from '../components/Tables/comparebalance';

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

const financials = [
  {
    value: 1,
    label: 'Balance Sheet',
  },
  {
    value: 2,
    label: 'Income Statement',
  },
  {
    value: 3,
    label: 'Account Details',
  },
  {
    value: 4,
    label: 'Compare Balance Sheet',
  },
  {
    value: 5,
    label: 'Compare Income Statement',
  }
];

class Report extends Component {

  state = {
    financials: 'Select',
  };

  handleFinancials = fin => event => {
    this.setState({
      [fin]: event.target.value,
    });
  };
  
  render() {
    
    const { classes } = this.props;

    return (
      <React.Fragment>
      <ResponsiveDrawer />
      <main className={classes.content}>
          <div className={classes.toolbar} />
      
      <Paper className="row">
        <form className={classes.container} noValidate autoComplete="off">
        
          <TextField
            id="financials"
            select
            label="Financial Report"
            className={classes.textField}
            value={this.state.financials}
            onChange={this.handleFinancials('financials')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Financial Report Selection"
            margin="normal"
            variant="outlined"
          >
            {financials.map(f => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </TextField>
        </form>
        </Paper>
        {(() => {
            switch(this.state.financials) {
              case 1: 
                return <BalanceSheet/>;
              case 2: 
                return <IncomeStatement/>;
              case 3: 
                return <AccountDetail/>;
              case 4: 
                return <CompareBalance/>;
              case 5: 
                return <CompareIncome/>;  
              default:
                return null;
            }
        })()}
      </main>
      <Footer />
      </React.Fragment>
    );
  }
}

Report.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Report);