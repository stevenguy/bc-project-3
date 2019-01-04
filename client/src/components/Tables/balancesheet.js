import React, { Component } from "react";
import API from "../../utils/API";
import Footer from "../Footer";
import ResponsiveDrawer from "../ResponsiveDrawer";
// Table Imports
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// Paper Imports
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
// Menu, Table, Expansion Panel Imports
import { withStyles } from '@material-ui/core/styles';
// Menu Imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// Expansion Panel Imports
import grey from '@material-ui/core/colors/grey';

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
  return `${nf.format(num.toFixed(2))}`;
  }
  return `${nf.format(num.toFixed(2))}`;
}

class Report extends Component {

  state = {
    accounts: [],
    year: [],
    transactions: [],
    acctdetails: [],
    typesum: [],
    acctdetailsum: [],
    account: '',
    years: 0,
    quarter: 0,
    month: 0,
    expanded: null,
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

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
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

  handleRun = () => {

    if (this.state.month === 0 && this.state.quarter === 0 ){
      API.yearly()
      // .then(res => console.log(res))
      .then(res => {
        let transactions = []
        res.data.forEach(element => {
          transactions.push({
            description: element._id.description,
            type: element._id.type,
            year: element._id.year,
            amount: element.amount,
          })
        })
        this.setState({ transactions: transactions })
      })
      .catch(err => console.log(err));
    } else if (this.state.month === 0) {
      API.quarterly()
      .then(res => {
        let transactions = []
        res.data.forEach(element => {
          if (element._id.quarter === this.state.quarter) {  
            transactions.push({
              description: element._id.description,
              type: element._id.type,
              year: element._id.year,
              quarter: element._id.quarter,
              amount: element.amount,
            })
          }
        })
        this.setState({ transactions: transactions })
      })
      .catch(err => console.log(err));
    } else {
      API.reports()
      .then(res => {
        let transactions = []
        res.data.forEach(element => {
          if (element._id.month === this.state.month && element._id.quarter === this.state.quarter) {  
            transactions.push({
              description: element._id.description,
              type: element._id.type,
              year: element._id.year,
              quarter: element._id.quarter,
              month: element._id.month,
              amount: element.amount,
            })
          }
        })
        this.setState({ transactions: transactions })
      })
      .catch(err => console.log(err));
    }
    
    if (this.state.month === 0 && this.state.quarter === 0 ){
      API.typeyear()
      .then(res => {
        let typesum = []
        res.data.forEach(element => {
          typesum.push({
            type: element._id.type,
            year: element._id.year,
            amount: element.amount,
          })
        })
        this.setState({ typesum: typesum })
        console.log(typesum)
      })
      .catch(err => console.log(err));
    } else if (this.state.month === 0) {
      API.typequarter()
      .then(res => {
        let typesum = []
        res.data.forEach(element => {
          if (element._id.quarter === this.state.quarter) {  
            typesum.push({
              type: element._id.type,
              year: element._id.year,
              quarter: element._id.quarter,
              amount: element.amount,
            })
          }
        })
        this.setState({ typesum: typesum })
        console.log(typesum)
      })
      .catch(err => console.log(err));
    } else {
      API.typemonth()
      .then(res => {
        let typesum = []
        res.data.forEach(element => {
          if (element._id.month === this.state.month && element._id.quarter === this.state.quarter) {
            typesum.push({
              type: element._id.type,
              year: element._id.year,
              quarter: element._id.quarter,
              month: element._id.month,
              amount: element.amount,
            })
          }
        })
        this.setState({ typesum: typesum })
        console.log(typesum)
      })
      .catch(err => console.log(err));
    }
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
            {/* Populate based on quarters */}
            {month.map(m => (
              <option key={m.valueMonth} value={m.valueMonth}>
                {m.labelMonth}
              </option>
            ))}
          </TextField>
          <Button onClick={this.handleRun} variant="contained" color="grey" className={classes.button}>
            Run
          </Button>
        </form>
      
    </Paper>
    <div style={ { height: 10 } }></div>

        <React.Fragment>
        <Paper>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell><b>ASSETS</b></TableCell>
                <TableCell align="right"><b>BALANCE</b></TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table>
            <TableBody>
              {this.state.transactions.map((output, i) => {
                if (output.type === 'Assets'
                && output.year === this.state.years
                ) {
                  return (
                    <TableRow key={i}>
                      <TableCell>{output.description}</TableCell>
                      <TableCell align="right">{ccyFormat(output.amount)}</TableCell>
                    </TableRow>
                  );  
                }
              })}
              {this.state.typesum.map((output, i) => {
                if (output.type === 'Assets'
                && output.year === this.state.years
                ) {
                  return (
                    <TableRow key={i}>
                      <TableCell><b>TOTAL</b></TableCell>
                      <TableCell align="right"><b>{ccyFormat(output.amount)}</b></TableCell>
                    </TableRow>
                  );  
                  }
              })}
            </TableBody>
          </Table>
        </Paper>
        <div style={ { height: 10 } }></div>
        {/* Liabilities */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell><b>LIABILITIES</b></TableCell>
                <TableCell align="right"><b>BALANCE</b></TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table>
            <TableBody>
              {this.state.transactions.map((output, i) => {
                if (output.type === 'Liability'
                && output.year === this.state.years
                ) {
                  return (
                    <TableRow key={i}>
                      <TableCell>{output.description}</TableCell>
                      <TableCell align="right">{ccyFormat(output.amount)}</TableCell>
                    </TableRow>
                  );  
                  }
              })}
              {this.state.typesum.map((output, i) => {
                if (output.type === 'Liability'
                && output.year === this.state.years
                ) {
                  return (
                    <TableRow key={i}>
                      <TableCell><b>TOTAL</b></TableCell>
                      <TableCell align="right"><b>{ccyFormat(output.amount)}</b></TableCell>
                    </TableRow>
                  );  
                  }
              })}
            </TableBody>
          </Table>
        </Paper>
        <div style={ { height: 10 } }></div>
        {/* Retained Earnings */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell><b>RETAINED EARNINGS</b></TableCell>
                <TableCell align="right"><b>BALANCE</b></TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table>
            <TableBody>
              {this.state.transactions.map((output, i) => {
                if (output.type === 'Retained Earnings'
                && output.year === this.state.years
                ) {
                  return (
                    <TableRow key={i}>
                      <TableCell>{output.description}</TableCell>
                      <TableCell align="right">{ccyFormat(output.amount)}</TableCell>
                    </TableRow>
                  );  
                  }
              })}
              {this.state.typesum.map((output, i) => {
                if (output.type === 'Retained Earnings'
                && output.year === this.state.years
                ) {
                  return (
                    <TableRow key={i}>
                      <TableCell><b>TOTAL</b></TableCell>
                      <TableCell align="right"><b>{ccyFormat(output.amount)}</b></TableCell>
                    </TableRow>
                  );  
                  }
              })}
            </TableBody>
          </Table>
        </Paper>
        </React.Fragment>
        
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