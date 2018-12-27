import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { entry } from "prop-types";
// import Financials from "../components/OptionMenu/financials";


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
    backgroundColor: theme.palette.common.default,
    color: theme.palette.common.white,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
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
  }
];

const year = [
  {
    value: 0,
    label: '',
  },
  {
    value: 2019,
    label: '2019',
  },
  {
    value: 2018,
    label: '2018',
  },
  {
    value: 2017,
    label: '2017',
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

function ccyFormat(num) {
  var nf = new Intl.NumberFormat();
  if (num < 0 ) {
  return `${nf.format(num * - 1)}`;
  }
  return `${nf.format(num)}`;
}

// function subtotal(items) {
//   return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
// }

// const total = subtotal();

class Transactions extends Component {

  state = {
    financials: 'Select',
    // accounts: [],
    year: 'Select',
    quarter: 'Select',
    month: 'Select',
    transactions: [],
    yearTransactions: [],
    quarterTransactions: [],
    monthTransactions: []
  };

  handleFinancials = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleYear = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleQuarter = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleMonth = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // handleAccounts = name => event => {
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };

  // componentDidMount() {
  //   this.loadYears();
  //   this.loadAccounts();
  // }

  // loadYears = () => {
  //   API.year()
  //   .then(res => this.setState({ year: res.data }))
  //   .catch(err => console.log(err));
  // };

  // loadAccounts = () => {
  //   API.accounts()
  //   .then(res => this.setState({ accounts: res.data }))
  //   .catch(err => console.log(err));
  // };
  
  componentDidMount() {
    this.loadAggr();
  }

  loadAggr = () => {
    API.aggrTransactions()
    .then(res => 
      
      
      this.setState({ transactions: res.data }))
    .catch(err => console.log(err));
  };

  render() {
    
    const { classes } = this.props;

    return (
      <Container className={classes.container}>
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
            <MenuItem key={f.value} value={f.value}>
              {f.label}
            </MenuItem>
          ))}
        </TextField>
        {/* { if ()} */}
        {/* <TextField
          id="year"
          select
          label="Year"
          className={classes.textField}
          value={this.state.year}
          onChange={this.handleYear('year')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Year Selection"
          margin="normal"
          variant="outlined"
        >
          {this.state.accounts.map(i => (
            <option key={i._id.description} value={i._id.description}>
              {i._id.description}
            </option>
          ))}
        </TextField> */}
        <TextField
          id="year"
          select
          label="Year"
          className={classes.textField}
          value={this.state.year}
          onChange={this.handleYear('year')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Year Selection"
          margin="normal"
          variant="outlined"
        >
          {year.map(y => (
            <option key={y.value} value={y.value}>
              {y.label}
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
            <MenuItem key={q.value} value={q.value}>
              {q.label}
            </MenuItem>
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
            native: true,
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
        </TextField>
        <Button variant="contained" color="default" className={classes.button}>
          Run
        </Button>
      </form>
      </Paper>
      <div style={ { height: 10 }}></div>
        {/* <Paper className="row">
          {/* <Financials /> 
        </Paper> */}
        
        <Paper>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {this.state.transactions.map((output, i) => {
                // let sumyearTransactions = {}
                // if(i.year === 2018 && i.quarter === 3 && i.month === 9){
                //   sumyearTransactions[i.description] = 0;
                // }
                // sumyearTransactions[i.description] += i.amount;
                // console.log(sumyearTransactions)
                
                return (
                  <TableRow key={i}>
                    <TableCell>{output._id.description}</TableCell>
                    {/* <TableCell>{output._id.type}</TableCell>
                    <TableCell>{output._id.year}</TableCell>
                    <TableCell>{output._id.quarter}</TableCell>
                    <TableCell>{output._id.month}</TableCell> */}
                    <TableCell align="right">{ccyFormat(output.amount)}</TableCell>
                  </TableRow>
                  // <TableRow>
                  // <TableCell rowSpan={3} />
                  // <TableCell colSpan={2}>Total</TableCell>
                  // <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  // </TableRow>
                  // <TableRow>
                  //   <TableCell colSpan={2}>Total</TableCell>
                  //   <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                  // </TableRow>
                );  
              })}
              {/* <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    );
  }
}

// OutlinedTextFields.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Transactions);
