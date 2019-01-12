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


const month = [
  {
    valueMonth: 0,
    labelMonth: ''
  },
  {
    valueMonth: 1,
    labelMonth: 'January'
  },
  {
    valueMonth: 2,
    labelMonth: 'February'
  },
  {
    valueMonth: 3,
    labelMonth: 'March'
  },
  {
    valueMonth: 4,
    labelMonth: 'April'
  },
  {
    valueMonth: 5,
    labelMonth: 'May'
  },
  {
    valueMonth: 6,
    labelMonth: 'June'
  },
  {
    valueMonth: 7,
    labelMonth: 'July'
  },
  {
    valueMonth: 8,
    labelMonth: 'August'
  },
  {
    valueMonth: 9,
    labelMonth: 'September'
  },
  {
    valueMonth: 10,
    labelMonth: 'October'
  },
  {
    valueMonth: 11,
    labelMonth: 'November'
  },
  {
    valueMonth: 12,
    labelMonth: 'December'
  },
];

function ccyFormat(num) {
  var nf = new Intl.NumberFormat();
  if (num < 0 ) {
  return `${nf.format(num.toFixed(2))}`;
  }
  return `${nf.format(num.toFixed(2))}`;
}

class IncomeMonth extends Component {

  state = {
    year: [],
    transactions: [],
    typesum: [],
    years: 0,
    month: 0,
  };

  handleYear = yr => event => {
    this.setState({
      [yr]: event.target.value,
    });
  };

  handleMonth = mth => event => {
    this.setState({
      [mth]: event.target.value,
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

    API.comparemonth()
      .then(res => {
        let transactions = []
        res.data.forEach(element => {
          console.log(element)
          transactions.push({
            description: element._id.description,
            type: element._id.type,
            year: element._id.year,
            M1: element.M1,
            M2: element.M2,
            M3: element.M3,
            M4: element.M4,
            M5: element.M5,
            M6: element.M6,
            M7: element.M7,
            M8: element.M8,
            M9: element.M9,
            M10: element.M10,
            M11: element.M11,
            M12: element.M12,
          })
        })
        this.setState({ transactions: transactions })
      })
      .catch(err => console.log(err));
      
    
    API.comparemthsum()
    .then(res => {
      let typesum = []
      res.data.forEach(element => {
        typesum.push({
          type: element._id.type,
          year: element._id.year,
          M1: element.M1,
          M2: element.M2,
          M3: element.M3,
          M4: element.M4,
          M5: element.M5,
          M6: element.M6,
          M7: element.M7,
          M8: element.M8,
          M9: element.M9,
          M10: element.M10,
          M11: element.M11,
          M12: element.M12,
        })
      })
      this.setState({ typesum: typesum })
    })
    .catch(err => console.log(err));
    
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
            {/* Populate based on quarters */}
            {month.map(m => (
              <option key={m.valueMonth} value={m.valueMonth}>
                {m.labelMonth}
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
            {(() => {
              switch(this.state.month) {
                case 1: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>REVENUE</b></TableCell>
                              <TableCell align="right"><b>DEC</b></TableCell>
                              <TableCell align="right"><b>JAN</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{this.state.years - 1 === output.year ? ccyFormat(output.M12) : 0}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M1)}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                          {this.state.typesum
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{this.state.years - 1 === output.year ? ccyFormat(output.M12) : 0}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M1)}</b></TableCell>
                                </TableRow>
                              );  
                            }
                          )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>DEC</b></TableCell>
                              <TableCell align="right"><b>JAN</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{this.state.years - 1 === output.year ? ccyFormat(output.M12) : 0}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M1)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{this.state.years - 1 === output.year ? ccyFormat(output.M12) : 0}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M1)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );
                case 2: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>REVENUE</b></TableCell>
                              <TableCell align="right"><b>JAN</b></TableCell>
                              <TableCell align="right"><b>FEB</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M1)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M2)}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                          {this.state.typesum
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M1)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M2)}</b></TableCell>
                                </TableRow>
                              );  
                            }
                          )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>JAN</b></TableCell>
                              <TableCell align="right"><b>FEB</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M1)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M2)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M1)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M2)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );
                case 3: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>REVENUE</b></TableCell>
                              <TableCell align="right"><b>FEB</b></TableCell>
                              <TableCell align="right"><b>MAR</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M2)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M3)}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                          {this.state.typesum
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M2)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M3)}</b></TableCell>
                                </TableRow>
                              );  
                            }
                          )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>FEB</b></TableCell>
                              <TableCell align="right"><b>MAR</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M2)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M3)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M2)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M3)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );
                case 4: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>REVENUE</b></TableCell>
                              <TableCell align="right"><b>MAR</b></TableCell>
                              <TableCell align="right"><b>APR</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M3)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M4)}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                          {this.state.typesum
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M3)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M4)}</b></TableCell>
                                </TableRow>
                              );  
                            }
                          )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>MAR</b></TableCell>
                              <TableCell align="right"><b>APR</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M3)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M4)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M3)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M4)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );
                case 5: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>REVENUE</b></TableCell>
                              <TableCell align="right"><b>APR</b></TableCell>
                              <TableCell align="right"><b>MAY</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M4)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M5)}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                          {this.state.typesum
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M4)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M5)}</b></TableCell>
                                </TableRow>
                              );  
                            }
                          )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>APR</b></TableCell>
                              <TableCell align="right"><b>MAY</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M4)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M5)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M4)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M5)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );
                case 6: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>REVENUE</b></TableCell>
                              <TableCell align="right"><b>MAY</b></TableCell>
                              <TableCell align="right"><b>JUN</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M5)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M6)}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                          {this.state.typesum
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M5)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M6)}</b></TableCell>
                                </TableRow>
                              );  
                            }
                          )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>MAY</b></TableCell>
                              <TableCell align="right"><b>JUN</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M5)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M6)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M5)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M6)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );
                case 7: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>REVENUE</b></TableCell>
                              <TableCell align="right"><b>JUN</b></TableCell>
                              <TableCell align="right"><b>JUL</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M6)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M7)}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                          {this.state.typesum
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M6)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M7)}</b></TableCell>
                                </TableRow>
                              );  
                            }
                          )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>JUN</b></TableCell>
                              <TableCell align="right"><b>JUL</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M6)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M7)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M6)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M7)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );
                case 8: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>REVENUE</b></TableCell>
                              <TableCell align="right"><b>JUL</b></TableCell>
                              <TableCell align="right"><b>AUG</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M7)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M8)}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                          {this.state.typesum
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M7)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M8)}</b></TableCell>
                                </TableRow>
                              );  
                            }
                          )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>JUL</b></TableCell>
                              <TableCell align="right"><b>AUG</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M7)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M8)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M7)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M8)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );  
                case 9: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>REVENUE</b></TableCell>
                              <TableCell align="right"><b>AUG</b></TableCell>
                              <TableCell align="right"><b>SEP</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M8)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M9)}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                          {this.state.typesum
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M8)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M9)}</b></TableCell>
                                </TableRow>
                              );  
                            }
                          )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>AUG</b></TableCell>
                              <TableCell align="right"><b>SEP</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M8)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M9)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M8)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M9)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );
                case 10: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>REVENUE</b></TableCell>
                              <TableCell align="right"><b>SEP</b></TableCell>
                              <TableCell align="right"><b>OCT</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M9)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.M10)}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                          {this.state.typesum
                            .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                            .map((output, i) => {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M9)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.M10)}</b></TableCell>
                                </TableRow>
                              );  
                            }
                          )}
                          </TableBody>
                        </Table>
                      </Paper>
                        <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>SEP</b></TableCell>
                              <TableCell align="right"><b>OCT</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M9)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M10)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M9)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M10)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );
                case 11: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>Revenue</b></TableCell>
                              <TableCell align="right"><b>OCT</b></TableCell>
                              <TableCell align="right"><b>NOV</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M10)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M11)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M10)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M11)}</b></TableCell>
                                  </TableRow>
                                );  
                              }
                            )}
                            </TableBody>
                        </Table>
                      </Paper>
                        <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>OCT</b></TableCell>
                              <TableCell align="right"><b>NOV</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M10)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M11)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M10)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M11)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );  
                case 12: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>Revenue</b></TableCell>
                              <TableCell align="right"><b>NOV</b></TableCell>
                              <TableCell align="right"><b>DEC</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M11)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M12)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Revenue' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M11)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M12)}</b></TableCell>
                                  </TableRow>
                                );  
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                        <div style={ { height: 10 } }></div>
                      {/* Expenses */}
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>NOV</b></TableCell>
                              <TableCell align="right"><b>DEC</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M11)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.M12)}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                            {this.state.typesum
                              .filter(output => output.type === 'Expenses' && output.year === this.state.years)
                              .map((output, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M11)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.M12)}</b></TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Paper>
                      <div style={ { height: 10 } }></div>
                    </React.Fragment>
                  );    
                default:
                  return null;
              }
            })()}  
        </Table>
      </React.Fragment>
      <Footer />
      </React.Fragment>
    );
  }
}

IncomeMonth.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncomeMonth);