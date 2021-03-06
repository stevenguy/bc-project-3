import React, { Component } from "react";
import API from "../../utils/API";
import Footer from "../Footer";
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
import MenuItem from '@material-ui/core/MenuItem';

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

class BalanceYear extends Component {

  state = {
    year: [],
    transactions: [],
    typesum: [],
    years: 0,
    hideHeaders: true
  };

  handleYear = yr => event => {
    this.setState({
      [yr]: event.target.value,
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

    this.setState({hideHeaders: false})

    function ccyFormat(num) {
      var nf = new Intl.NumberFormat();
      return `${nf.format(num.toFixed(2))}`;
    }

    API.yearly()
      .then(res => {
        let description = []
        let prevAmt = []
        let currAmt = []
        let transactions = []
        let type = []
        res.data.forEach(element => {
          if (description.indexOf(element._id.description) > - 1) {
            let a
          } else {
            description.push(element._id.description)
            type.push(element._id.type)
          }
        })
        for (let i = 0; i < description.length; i++) {
          prevAmt.push(0)
          currAmt.push(0)
        }
        res.data.forEach(element => {
          let currYear = this.state.years
          let prevYear = this.state.years - 1
          let index = description.indexOf(element._id.description)
          if (element._id.year === currYear) {
            currAmt[index] += element.amount 
          } else if (element._id.year === prevYear) {
            prevAmt[index] += element.amount 
          } else {
            return null
          }
        })
        for (let i = 0; i < description.length; i++) {
          transactions.push({
            description: description[i],
            type: type[i],
            prevAmt: type[i] === "Liability" || type[i] === "Retained Earnings" ? ccyFormat(prevAmt[i] * - 1) : ccyFormat(prevAmt[i]),
            currAmt: type[i] === "Liability" || type[i] === "Retained Earnings" ? ccyFormat(currAmt[i] * - 1) : ccyFormat(currAmt[i])
          })
        }
        this.setState({ transactions: transactions })
      })
      .catch(err => console.log(err));
    
    API.typeyear()
    .then(res => {
      let prevTotal = []
      let currTotal = []
      let typesum = []
      let type = []
      res.data.forEach(element => {
        if (type.indexOf(element._id.type) > - 1) {
          let a
        } else {
          type.push(element._id.type)
        }
      })
      for (let i = 0; i < type.length; i++) {
        prevTotal.push(0)
        currTotal.push(0)
      }
      res.data.forEach(element => {
        let currYear = this.state.years
        let prevYear = this.state.years - 1
        let index = type.indexOf(element._id.type)
        if (element._id.year === currYear) {
          currTotal[index] += element.amount 
        } else if (element._id.year === prevYear) {
          prevTotal[index] += element.amount 
        } else {
          return null
        }
      })
      for (let i = 0; i < type.length; i++) {
        typesum.push({
          type: type[i],
          prevTotal: type[i] === "Liability" || type[i] === "Retained Earnings" ? ccyFormat(prevTotal[i] * - 1) : ccyFormat(prevTotal[i]),
          currTotal: type[i] === "Liability" || type[i] === "Retained Earnings" ? ccyFormat(currTotal[i] * - 1) : ccyFormat(currTotal[i])
        })
      }
      this.setState({ typesum: typesum })
    })
    .catch(err => console.log(err));
  };
  
  render() {
    
    const { classes } = this.props;

    const styles = this.state.hideHeaders ? {display: 'none'} : {}

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
              <MenuItem key={y._id.year} value={y._id.year}>
                {y._id.year}
              </MenuItem>
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
          <Paper>
            <Table>
              <TableHead>
                <TableRow className={classes.head} style={styles}>
                  <TableCell><b>ASSET</b></TableCell>
                  <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                  <TableCell align="right"><b>{this.state.years}</b></TableCell>
                </TableRow>
              </TableHead>
            </Table>
            <Table>
              <TableBody>
              {this.state.transactions
                .filter(output => output.type === 'Assets')
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
                .filter(output => output.type === 'Assets')
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
          {/* Liabilities */}
          <Paper>
            <Table>
              <TableHead>
                <TableRow className={classes.head} style={styles}>
                  <TableCell><b>LIABILITIES</b></TableCell>
                  <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                  <TableCell align="right"><b>{this.state.years}</b></TableCell>
                </TableRow>
              </TableHead>
            </Table>
            <Table>
              <TableBody>
                {this.state.transactions
                  .filter(output => output.type === 'Liability')
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
                  .filter(output => output.type === 'Liability')
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
          {/* Retained Earnings */}
          <Paper>
            <Table>
              <TableHead>
                <TableRow className={classes.head} style={styles}>
                  <TableCell><b>RETAINED EARNINGS</b></TableCell>
                  <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                  <TableCell align="right"><b>{this.state.years}</b></TableCell>
                </TableRow>
              </TableHead>
            </Table>
            <Table>
              <TableBody>
                {this.state.transactions
                  .filter(output => output.type === 'Retained Earnings')
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
                  .filter(output => output.type === 'Retained Earnings')
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
        </Table>
      </React.Fragment>
      <Footer />
      </React.Fragment>
    );
  }
}

BalanceYear.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BalanceYear);