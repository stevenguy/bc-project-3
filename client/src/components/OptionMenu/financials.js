import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';

const drawerWidth = 240;

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
    paddingBottom: '130px',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
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
  }
];

const month = [
  {
    valueMonth: 0,
    labelMonth: '',
    value: 0,
    label: '',
  },
  {
    valueMonth: 1,
    labelMonth: 'January',
    value: 1,
    label: 'Q1',
  },
  {
    valueMonth: 2,
    labelMonth: 'February',
    value: 1,
    label: 'Q1',
  },
  {
    valueMonth: 3,
    labelMonth: 'March',
    value: 1,
    label: 'Q1',
  },
  {
    valueMonth: 4,
    labelMonth: 'April',
    value: 2,
    label: 'Q2',
  },
  {
    valueMonth: 5,
    labelMonth: 'May',
    value: 2,
    label: 'Q2',
  },
  {
    valueMonth: 6,
    labelMonth: 'June',
    value: 2,
    label: 'Q2',
  },
  {
    valueMonth: 7,
    labelMonth: 'July',
    value: 3,
    label: 'Q3',
  },
  {
    valueMonth: 8,
    labelMonth: 'August',
    value: 3,
    label: 'Q3',
  },
  {
    valueMonth: 9,
    labelMonth: 'September',
    value: 3,
    label: 'Q3',
  },
  {
    valueMonth: 10,
    labelMonth: 'October',
    value: 4,
    label: 'Q4',
  },
  {
    valueMonth: 11,
    labelMonth: 'November',
    value: 4,
    label: 'Q4',
  },
  {
    valueMonth: 12,
    labelMonth: 'December',
    value: 4,
    label: 'Q4',
  },
];

const quarter = [
  {
    value: 0,
    label: '',
  },
  {
    value: 1,
    label: 'Q1',
  },
  {
    value: 2,
    label: 'Q2',
  },
  {
    value: 3,
    label: 'Q3',
  },
  {
    value: 4,
    label: 'Q4',
  }
];

class FinancialMenu extends Component {

  state = {
    accounts: [],
    year: [],
    financials: 'Select',
    account: '',
    years: 0,
    quarter: 0,
    month: 0,
  };

  handleFinancials = fin => event => {
    this.setState({
      [fin]: event.target.value,
    });
  };

  handleYear = yr => event => {
    this.setState({
      [yr]: event.target.value,
    });
  };

  handleQuarter = qtr => event => {
    this.setState({
      [qtr]: event.target.value,
    });
  };

  handleMonth = mth => event => {
    this.setState({
      [mth]: event.target.value,
    });
  };

  handleAccounts = acct => event => {
    this.setState({
      [acct]: event.target.value,
    });
  };

  componentDidMount() {
    this.loadAccounts();
    this.loadYear();
  }

  loadYear = () => {
    API.year()
    .then(res => this.setState({ year: res.data }))
    .catch(err => console.log(err));
  }

  loadAccounts = () => {
    API.accounts()
    .then(res => this.setState({ accounts: res.data }))
    .catch(err => console.log(err));
  }
  
  render() {
    
    const { classes } = this.props;

    return (
      
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
        <TextField
          id="accounts"
          select
          label="Account"
          className={classes.textField}
          value={this.state.account}
          onChange={this.handleAccounts('account')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Account Selection"
          margin="normal"
          variant="outlined"
        >
          {this.state.accounts.map(i => (
            <option key={i._id.account} value={i._id.description}>
              {i._id.description}
            </option>
          ))}
        </TextField>
        <TextField
          id="year"
          select
          label="Year"
          className={classes.textField}
          value={this.state.years}
          onChange={this.handleYear('years')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Year Selection"
          margin="normal"
          variant="outlined"
        >
          {this.state.year.map(y => (
            <option key={y._id.year} value={y._id.year}>
              {y._id.year}
            </option>
          ))}
        </TextField>
        <TextField
          id="quarter"
          select
          label="Quarter"
          className={classes.textField}
          value={this.state.quarter}
          onChange={this.handleQuarter('quarter')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Quarter Selection"
          margin="normal"
          variant="outlined"
        >
          {quarter.map(q => (
            <option key={q.value} value={q.value}>
              {q.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="month"
          select
          label="Month"
          className={classes.textField}
          value={this.state.month}
          onChange={this.handleMonth('month')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Month Selection"
          margin="normal"
          variant="outlined"
        >
          {month.map(m => (
            <option key={m.valueMonth} value={m.valueMonth}>
              {m.labelMonth}
            </option>
          ))}
          {/* Populate based on quarters */}
          {/* {month.map((m, i) => {
            if (m.value === this.state.quarter) {
              return (
                <option key={m.valueMonth} value={m.valueMonth}>
                {m.valueLabel}
                </option>
              );
            }
          })} */}
        </TextField>
        <Button onClick={this.props.handleRun} variant="contained" color="grey" className={classes.button}>
          Run
        </Button>
      </form>
    )
  }
}

FinancialMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FinancialMenu);