import React, { Component } from "react";
import API from "../../utils/API";
import Footer from "../Footer";
import ResponsiveDrawer from "../ResponsiveDrawer";
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

class IncomeQuarter extends Component {

  state = {
    year: [],
    transactions: [],
    typesum: [],
    years: 0,
    quarter: 0,
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

  componentDidMount() {
    this.loadYear();
  }

  loadYear = () => {
    API.year()
    .then(res => this.setState({ year: res.data }))
    .catch(err => console.log(err));
  }

  handleRun = () => {
    
    function ccyFormat(num) {
      var nf = new Intl.NumberFormat();
      return `${nf.format(num.toFixed(2))}`;
    }
    
    if (this.state.quarter === 1 ) {
      API.quarterly()
        .then(res => {
          let transactions = []
          let description = []
          let prevAmt = []
          let currAmt = []
          let type = []
          let quarter = []
          res.data.forEach(element => {
            if (description.indexOf(element._id.description) > - 1) {
              let a
            } else {
              description.push(element._id.description)
              type.push(element._id.type)
              quarter.push(element._id.quarter)
            }
          })
          for (let i = 0; i < description.length; i++) {
            prevAmt.push(0)
            currAmt.push(0)
          }
          res.data.forEach(element => {
            let currQuarter = this.state.quarter
            let prevQuarter = 4
            let index = description.indexOf(element._id.description)
            if (element._id.quarter === currQuarter && element._id.year === this.state.years) {
              currAmt[index] += element.amount 
            } else if (element._id.quarter === prevQuarter && element._id.year === (this.state.years - 1)) {
              prevAmt[index] += element.amount 
            } else {
              return null
            }
          })
          for (let i = 0; i < description.length; i++) {
            transactions.push({
              description: description[i],
              type: type[i],
              quarter: quarter[i],
              prevAmt: ccyFormat(prevAmt[i] * - 1),
              currAmt: ccyFormat(currAmt[i] * - 1),
            })
          }
          this.setState({ transactions: transactions })
        })
        .catch(err => console.log(err));
      
      API.typequarter()
      .then(res => {
        let typesum = []
        let prevTotal = []
        let currTotal = []
        let type = []
        let quarter = []
        res.data.forEach(element => {
          if (type.indexOf(element._id.type) > - 1) {
            let a
          } else {
            type.push(element._id.type)
            quarter.push(element._id.quarter)
          }
        })
        for (let i = 0; i < type.length; i++) {
          prevTotal.push(0)
          currTotal.push(0)
        }
        res.data.forEach(element => {
          let currQuarter = this.state.quarter
          let prevQuarter = 4
          let index = type.indexOf(element._id.type)
          if (element._id.quarter === currQuarter && element._id.year === this.state.years) {
            currTotal[index] += element.amount 
          } else if (element._id.quarter === prevQuarter && element._id.year === (this.state.years - 1)) {
            prevTotal[index] += element.amount 
          } else {
            return null
          }
        })
        for (let i = 0; i < type.length; i++) {
          typesum.push({
            type: type[i],
            quarter: quarter[i],
            prevTotal: ccyFormat(prevTotal[i] * - 1),
            currTotal: ccyFormat(currTotal[i] * - 1)
          })
        }
        this.setState({ typesum: typesum })
      })
      .catch(err => console.log(err));

    } else {
      API.quarterly()
        .then(res => {
          let transactions = []
          let description = []
          let prevAmt = []
          let currAmt = []
          let type = []
          let year = []
          let quarter = []
          res.data.forEach(element => {
            if (description.indexOf(element._id.description) > - 1) {
              let a
            } else {
              description.push(element._id.description)
              type.push(element._id.type)
              year.push(element._id.year)
              quarter.push(element._id.quarter)
            }
          })
          for (let i = 0; i < description.length; i++) {
            prevAmt.push(0)
            currAmt.push(0)
          }
          res.data.forEach(element => {
            let currQuarter = this.state.quarter
            let prevQuarter = this.state.quarter - 1
            let index = description.indexOf(element._id.description)
            if (element._id.quarter === currQuarter && element._id.year === this.state.years) {
              currAmt[index] += element.amount 
            } else if (element._id.quarter === prevQuarter && element._id.year === this.state.years) {
              prevAmt[index] += element.amount 
            } else {
              return null
            }
          })
          for (let i = 0; i < description.length; i++) {
            transactions.push({
              description: description[i],
              type: type[i],
              year: year[i],
              quarter: quarter[i],
              prevAmt: ccyFormat(prevAmt[i] * - 1),
              currAmt: ccyFormat(currAmt[i] * - 1)
            })
          }
          this.setState({ transactions: transactions })
        })
        .catch(err => console.log(err));
      
      API.typequarter()
      .then(res => {
        let typesum = []
        let prevTotal = []
        let currTotal = []
        let type = []
        let year = []
        let quarter = []
        res.data.forEach(element => {
          if (type.indexOf(element._id.type) > - 1) {
            let a
          } else {
            type.push(element._id.type)
            year.push(element._id.year)
            quarter.push(element._id.quarter)
          }
        })
        for (let i = 0; i < type.length; i++) {
          prevTotal.push(0)
          currTotal.push(0)
        }
        res.data.forEach(element => {
          let currQuarter = this.state.quarter
          let prevQuarter = this.state.quarter - 1
          let index = type.indexOf(element._id.type)
          if (element._id.quarter === currQuarter && element._id.year === this.state.years) {
            currTotal[index] += element.amount 
          } else if (element._id.quarter === prevQuarter && element._id.year === this.state.years) {
            prevTotal[index] += element.amount 
          } else {
            return null
          }
        })
        for (let i = 0; i < type.length; i++) {
          typesum.push({
            type: type[i],
            year: year[i],
            quarter: quarter[i],
            prevTotal: ccyFormat(prevTotal[i] * - 1),
            currTotal: ccyFormat(currTotal[i] * - 1)
          })
        }
        this.setState({ typesum: typesum })
      })
      .catch(err => console.log(err));
    };
  };
  
  render() {
    
    const { classes } = this.props;

    return (

      <React.Fragment>
      <div style={ { height: 10 } }></div>
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
        </form>

        <Button onClick={this.handleRun} variant="contained" color="grey" className={classes.button}>
          Run
        </Button>
      </Paper>

      <div style={ { height: 10 } }></div>

      <React.Fragment>
        <Table>
          <React.Fragment>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow className={classes.head} >
                    <TableCell><b>REVENUE</b></TableCell>
                    {this.state.quarter === 1 ?
                      <React.Fragment>
                        <TableCell align="right">Q4-{this.state.years - 1}</TableCell>
                        <TableCell align="right">Q1-{this.state.years}</TableCell>
                      </React.Fragment>
                      :
                      quarter
                        .filter(output => output.value === this.state.quarter || output.value === this.state.quarter - 1 )
                        .map((output, i) => {
                          return (
                            <React.Fragment>
                              <TableCell align="right">{output.value === this.state.quarter - 1 ? output.label + "-" + this.state.years : ""}</TableCell>
                              <TableCell align="right">{output.value === this.state.quarter ? output.label + "-" + this.state.years : ""}</TableCell>
                            </React.Fragment>
                          );
                        }
                      )
                    }
                  </TableRow>
                </TableHead>
              </Table>
              <Table>
                <TableBody>
                {this.state.transactions
                  .filter(output => output.type === 'Revenue')
                  .map((output, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{output.description}</TableCell>
                        <TableCell align="right">{output.prevAmt}</TableCell>
                        <TableCell align="right">{output.currAmt}</TableCell>
                      </TableRow>
                    );
                  }
                )}
                {this.state.typesum
                  .filter(output => output.type === 'Revenue')
                  .map((output, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell><b>TOTAL</b></TableCell>
                        <TableCell align="right"><b>{output.prevTotal}</b></TableCell>
                        <TableCell align="right"><b>{output.currTotal}</b></TableCell>
                      </TableRow>
                    );  
                  }
                )}
                </TableBody>
              </Table>
            </Paper>
            <div style={ { height: 10 } }></div>
            {/* EXPENSE */}
            <Paper>
              <Table>
                <TableHead>
                  <TableRow className={classes.head} >
                    <TableCell><b>EXPENSES</b></TableCell>
                    {this.state.quarter === 1 ?
                      <React.Fragment>
                        <TableCell align="right">Q4-{this.state.years - 1}</TableCell>
                        <TableCell align="right">Q1-{this.state.years}</TableCell>
                      </React.Fragment>
                      :
                      quarter
                        .filter(output => output.value === this.state.quarter || output.value === this.state.quarter - 1 )
                        .map((output, i) => {
                          return (
                            <React.Fragment>
                              <TableCell align="right">{output.value === this.state.quarter - 1 ? output.label + "-" + this.state.years : ""}</TableCell>
                              <TableCell align="right">{output.value === this.state.quarter ? output.label + "-" + this.state.years : ""}</TableCell>
                            </React.Fragment>
                          );
                        }
                      )
                    }
                  </TableRow>
                </TableHead>
              </Table>
              <Table>
                <TableBody>
                  {this.state.transactions
                    .filter(output => output.type === 'Expenses')
                    .map((output, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{output.description}</TableCell>
                          <TableCell align="right">{output.prevAmt}</TableCell>
                          <TableCell align="right">{output.currAmt}</TableCell>
                        </TableRow>
                      );
                    }
                  )}
                  {this.state.typesum
                    .filter(output => output.type === 'Expenses')
                    .map((output, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell><b>TOTAL</b></TableCell>
                          <TableCell align="right"><b>{output.prevTotal}</b></TableCell>
                          <TableCell align="right"><b>{output.currTotal}</b></TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </Paper>
            <div style={ { height: 10 } }></div>
          </React.Fragment>
        </Table>
      </React.Fragment>
      <Footer />
      </React.Fragment>
    );
  }
}

IncomeQuarter.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncomeQuarter);