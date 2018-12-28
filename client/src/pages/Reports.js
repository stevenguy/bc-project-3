import React, { Component } from "react";
import API from "../utils/API";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { entry } from "prop-types";
import Financials from "../components/OptionMenu/financials";
import grey from '@material-ui/core/colors/grey';


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
  }
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

// const year = [
//   {
//     value: 0,
//     label: '',
//   },
//   {
//     value: 2019,
//     label: '2019',
//   },
//   {
//     value: 2018,
//     label: '2018',
//   },
//   {
//     value: 2017,
//     label: '2017',
//   }
// ];

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

function ccyFormat(num) {
  var nf = new Intl.NumberFormat();
  if (num < 0 ) {
  return `${nf.format(num.toFixed(0))}`;
  }
  return `${nf.format(num.toFixed(0))}`;
}

// function subtotal(items) {
//   return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
// }

// const total = subtotal();

class Transactions extends Component {

  state = {
    financials: 'Select',
    accounts: [],
    year: [],
    quarter: 'Select',
    month: 'Select',
    transactions: [],
    yearTransactions: [],
    quarterTransactions: [],
    monthTransactions: [],
    years: '',
    account:'',
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
    this.loadAggr();
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

  // loadAggr = event => {

  loadAggr = () => {
    // event.preventDefault();
    API.aggrTransactions()
    .then(res => this.setState({ transactions: res.data }))
    .catch(err => console.log(err));
  };

  render() {
    
    const { classes } = this.props;

    return (
      <div className="container">
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
        <TextField
          id="accounts"
          select
          label="Account"
          className={classes.textField}
          value={this.state.account}
          onChange={this.handleAccounts('accounts')}
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
            <option key={i._id.account} value={i._id.account}>
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
          onChange={this.handleYear('year')}
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
          {/* Populate based on quarters */}
          {month.map(m => (
            <option key={m.valueMonth} value={m.valueMonth}>
              {m.labelMonth}
            </option>
          ))}
        </TextField>
        <Button onClick={this.props.loadAggr} variant="contained" color="grey" className={classes.button}>
          Run
        </Button>
      </form>
      </Paper>
      <div style={ { height: 10 }}></div>
        <Paper className="row">
           {/* <Financials />  */}
        </Paper>
      <div style={ { height: 10 }}></div>  
      {/* ASSETS */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell>ASSETS</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table>
            <TableBody>
            {this.state.transactions.map((output, i) => {
                // const assets = output.filter(function(element) {
                //     return element.type.includes('Expenses');
                // });
                // const aSum = assets.reduce(function(sum, element) {
                //   return sum + element.amount;
                // }, 0)
                // console.log(aSum)
                if (output._id.type === 'Assets'
                  && output._id.year === 2018
                  && output._id.quarter === 2
                  && output._id.month === 4
                ) {
                return (
                  <TableRow key={i}>
                    <TableCell>{output._id.description}</TableCell>
                    <TableCell align="right">{ccyFormat(output.amount)}</TableCell>
                  </TableRow>
                  // <TableRow>
                  // <TableCell rowSpan={3} />
                  // <TableCell colSpan={2} >Total</TableCell>
                  // <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  // </TableRow>
                );  
                }
              })}
            </TableBody>
          </Table>
        </Paper>
        <div style={ { height: 10 }}></div>
        {/* Liabilities */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell>LIABILITIES</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table>
            <TableBody>
            {this.state.transactions.map((output, i) => {
                if (output._id.type === 'Liability'
                  && output._id.year === 2018
                  && output._id.quarter === 2
                  && output._id.month === 4
                  ) {
                return (
                  <TableRow key={i}>
                    <TableCell>{output._id.description}</TableCell>
                    <TableCell align="right">{ccyFormat(output.amount)}</TableCell>
                  </TableRow>
                  // <TableRow>
                  // <TableCell rowSpan={3} />
                  // <TableCell colSpan={2}>Total</TableCell>
                  // <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  // </TableRow>
                );  
                }
              })}
            </TableBody>
          </Table>
        </Paper>
        <div style={ { height: 10 }}></div>
        {/* Retained Earnings */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell>RETAINED EARNINGS</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table>
            <TableBody>
            {this.state.transactions.map((output, i) => {
                if (output._id.type === 'Retained Earnings'
                  && output._id.year === 2018
                  && output._id.quarter === 2
                  && output._id.month === 4
                  ) {
                return (
                  <TableRow key={i}>
                    <TableCell>{output._id.description}</TableCell>
                    <TableCell align="right">{ccyFormat(output.amount)}</TableCell>
                  </TableRow>
                  // <TableRow>
                  // <TableCell rowSpan={3} />
                  // <TableCell colSpan={2}>Total</TableCell>
                  // <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  // </TableRow>
                );  
                }
              })}
            </TableBody>
          </Table>
        </Paper>
        <div style={ { height: 10 }}></div>
        {/* REVENUE */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell>REVENUE</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table>
            <TableBody>
            {this.state.transactions.map((output, i) => {
                if (output._id.type === 'Revenue'
                  && output._id.year === 2018
                  && output._id.quarter === 1
                  && output._id.month === 1
                  ) {
                return (
                  <TableRow key={i}>
                    <TableCell>{output._id.description}</TableCell>
                    <TableCell align="right">{ccyFormat(output.amount)}</TableCell>
                  </TableRow>
                  // <TableRow>
                  // <TableCell rowSpan={3} />
                  // <TableCell colSpan={2}>Total</TableCell>
                  // <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  // </TableRow>
                );  
                }
              })}
            </TableBody>
          </Table>
        </Paper>
        <div style={ { height: 10 }}></div>
        {/* EXPENSES */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell>EXPENSES</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table>
            <TableBody>
            {this.state.transactions.map((output, i) => {
                if (output._id.type === 'Expenses' 
                  && output._id.year === 2018
                  && output._id.quarter === 1
                  && output._id.month === 1
                  ) {
                return (
                  <TableRow key={i}>
                    <TableCell>{output._id.description}</TableCell>
                    <TableCell align="right">{ccyFormat(output.amount)}</TableCell>
                  </TableRow>
                  // <TableRow>
                  // <TableCell rowSpan={3} />
                  // <TableCell colSpan={2}>Total</TableCell>
                  // <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  // </TableRow>
                );  
                }
              })}
            </TableBody>
          </Table>
        </Paper>
        <div style={ { height: 10 }}></div>
        {/* ACCOUNT DETAILS */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell>ACCOUNT DETAILS</TableCell>
                <TableCell align="right">MONTH</TableCell>
                <TableCell align="right">YEAR</TableCell>
                <TableCell align="right">AMOUNT</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table>
            <TableBody>
            {this.state.transactions.map((output, i) => {
                if (output._id.description === 'Advertising' 
                  && output._id.year === 2018
                  // && output._id.quarter === 1
                  // && output._id.month === 1
                  ) {
                return (
                  <TableRow key={i}>
                    <TableCell>{output._id.description}</TableCell>
                    <TableCell align="right">{output._id.month}</TableCell>
                    <TableCell align="right">{output._id.year}</TableCell>
                    <TableCell align="right">{ccyFormat(output.amount)}</TableCell>
                  </TableRow>
                  // <TableRow>
                  // <TableCell rowSpan={3} />
                  // <TableCell colSpan={2}>Total</TableCell>
                  // <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  // </TableRow>
                );  
                }
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

Transactions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Transactions);