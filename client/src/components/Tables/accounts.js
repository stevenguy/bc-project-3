import React, { Component } from "react";
import API from "../../utils/API";
import Footer from "../Footer";
import ResponsiveDrawer from "../ResponsiveDrawer";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  },
  {
    valueMonth: 1,
    labelMonth: 'January',
  },
  {
    valueMonth: 2,
    labelMonth: 'February',
  },
  {
    valueMonth: 3,
    labelMonth: 'March',
  },
  {
    valueMonth: 4,
    labelMonth: 'April',
  },
  {
    valueMonth: 5,
    labelMonth: 'May',
  },
  {
    valueMonth: 6,
    labelMonth: 'June',
  },
  {
    valueMonth: 7,
    labelMonth: 'July',
  },
  {
    valueMonth: 8,
    labelMonth: 'August',
  },
  {
    valueMonth: 9,
    labelMonth: 'September',
  },
  {
    valueMonth: 10,
    labelMonth: 'October',
  },
  {
    valueMonth: 11,
    labelMonth: 'November',
  },
  {
    valueMonth: 12,
    labelMonth: 'December',
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

const level = [
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

function ccyFormat(num) {
  var nf = new Intl.NumberFormat();
  if (num < 0 ) {
  return `${nf.format(num.toFixed(2))}`;
  }
  return `${nf.format(num.toFixed(2))}`;
}

class Acct extends Component {

  state = {
    accounts: [],
    year: [],
    acctdetails: [],
    acctdetailsum: [],
    account: '',
    level: 0,
    years: 0,
    quarter: 0,
    month: 0,
    expanded: null,
  };

  handleLevel = lvl => event => {
    this.setState({
      [lvl]: event.target.value,
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

    if (this.state.level === 1){
      API.acctyear()
      .then(res => {
        let acctdetails = []
        res.data.forEach(element => {
          acctdetails.push({
            journal_id: element._id.journal_id,
            date: new Date(element._id.date),
            account: element._id.account,
            description: element._id.description,
            type: element._id.type,
            transaction: element._id.transaction,
            memo: element._id.memo,
            detail: element._id.detail,
            preparer: element._id.preparer,
            prepared_date: new Date(element._id.prepared_date),
            approver: element._id.approver,
            approved_date: new Date(element._id.approved_date),
            year: element._id.year,
            quarter: element._id.quarter,
            amount: element.amount,
          })
        })
        this.setState({ acctdetails: acctdetails })
      })
      .catch(err => console.log(err));
    } else if (this.state.level === 2) {
      API.acctquarter()
      .then(res => {
        let acctdetails = []
        res.data.forEach(element => {
          if (element._id.quarter === this.state.quarter) {  
            acctdetails.push({
              journal_id: element._id.journal_id,
              date: new Date(element._id.date),
              account: element._id.account,
              description: element._id.description,
              type: element._id.type,
              transaction: element._id.transaction,
              memo: element._id.memo,
              detail: element._id.detail,
              preparer: element._id.preparer,
              prepared_date: new Date(element._id.prepared_date),
              approver: element._id.approver,
              approved_date: new Date(element._id.approved_date),
              year: element._id.year,
              quarter: element._id.quarter,
              amount: element.amount,
            })
          }
        })
        this.setState({ acctdetails: acctdetails })
      })
      .catch(err => console.log(err));
    } else if (this.state.level === 3) {
      API.acctmonth()
      .then(res => {
        let acctdetails = []
        res.data.forEach(element => {
          if (element._id.month === this.state.month) {  
            acctdetails.push({
              journal_id: element._id.journal_id,
              date: new Date(element._id.date),
              account: element._id.account,
              description: element._id.description,
              type: element._id.type,
              transaction: element._id.transaction,
              memo: element._id.memo,
              detail: element._id.detail,
              preparer: element._id.preparer,
              prepared_date: new Date(element._id.prepared_date),
              approver: element._id.approver,
              approved_date: new Date(element._id.approved_date),
              year: element._id.year,
              quarter: element._id.quarter,
              month: element._id.month,
              amount: element.amount,
            })
          }
        })
        this.setState({ acctdetails: acctdetails })
      })
      .catch(err => console.log(err));
    } else {
      return null
    }

    if (this.state.level === 1) {
      API.yearly()
      .then(res => {
        let acctdetailsum = []
        res.data.forEach(element => {
          acctdetailsum.push({
            description: element._id.description,
            type: element._id.type,
            year: element._id.year,
            amount: element.amount,
          })
        })
        this.setState({ acctdetailsum: acctdetailsum })
      })
      .catch(err => console.log(err));
    } else if (this.state.level === 2) {
      API.quarterly()
      .then(res => {
        let acctdetailsum = []
        res.data.forEach(element => {
          if (element._id.quarter === this.state.quarter) {  
            acctdetailsum.push({
              description: element._id.description,
              type: element._id.type,
              year: element._id.year,
              quarter: element._id.quarter,
              amount: element.amount,
            })
          }
        })
        this.setState({ acctdetailsum: acctdetailsum })
      })
      .catch(err => console.log(err));
    } else if (this.state.level === 3) {
      API.monthly()
      .then(res => {
        let acctdetailsum = []
        res.data.forEach(element => {
          if (element._id.month === this.state.month) {  
            acctdetailsum.push({
              description: element._id.description,
              type: element._id.type,
              year: element._id.year,
              quarter: element._id.quarter,
              month: element._id.month,
              amount: element.amount,
            })
          }
        })
        this.setState({ acctdetailsum: acctdetailsum })
      })
      .catch(err => console.log(err));
    } else {
      return null
    }
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
            id="level"
            select
            label="Level"
            className={classes.textField}
            value={this.state.level}
            onChange={this.handleLevel('level')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Level Selection"
            margin="normal"
            variant="outlined"
          >
            {level.map(l => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </TextField>
        </form>
      </Paper>
      <div style={ { height: 10 } }></div>
      <Paper className="row">
        {(() => {
            switch(this.state.level) {
              case 1: 
                return (
                  <form className={classes.container} noValidate autoComplete="off">
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
                    <Button onClick={this.handleRun} variant="contained" color="grey" className={classes.button}>
                      Run
                    </Button>
                  </form>
                );
              case 2: 
                return (
                  <form className={classes.container} noValidate autoComplete="off">
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
                    <Button onClick={this.handleRun} variant="contained" color="grey" className={classes.button}>
                      Run
                    </Button>
                  </form>
                );
              case 3: 
                return (
                  <form className={classes.container} noValidate autoComplete="off">
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
                    </TextField>
                    <Button onClick={this.handleRun} variant="contained" color="grey" className={classes.button}>
                      Run
                    </Button>
                  </form>
                );
              default:
                return null;
            }
        })()}
      </Paper>

    <div style={ { height: 10 } }></div>

      <React.Fragment>
        <Paper>
          {this.state.acctdetailsum
            .filter(output => output.description === this.state.account && output.year === this.state.years)
            .map((output, i) => {
              return (
                <TableRow>
                  <TableCell colSpan={3} align="right"><b>BALANCE: {ccyFormat(output.amount)}</b></TableCell>
                </TableRow>
              );
            }
          )}
          {this.state.acctdetails
            .filter(output => output.description === this.state.account && output.year === this.state.years)
            .map((output, i) => {
              return (
                <ExpansionPanel expanded={this.state.expanded === i } onChange={this.handleExpand(i)} key={i}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{output.transaction}</Typography>
                    <Typography className={classes.secondaryHeading}>{ccyFormat(output.amount)}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell><b>Journal ID:</b> {output.journal_id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><b>Date:</b> {output.date.toLocaleDateString('en-US')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><b>Account:</b> {output.account}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><b>Description:</b> {output.description}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><b>Type:</b> {output.type}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><b>Memo:</b> {output.memo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><b>Detail:</b> {output.detail}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><b>Preparer:</b> {output.preparer}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><b>Prepared Date:</b> {output.prepared_date.toLocaleDateString('en-US')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><b>Approver:</b> {output.approver}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><b>Approved Date:</b> {output.approved_date.toLocaleDateString('en-US')}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );  
            }
          )}
        </Paper>
      </React.Fragment>
    <Footer />
    </React.Fragment>
  );
}
}

Acct.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Acct);