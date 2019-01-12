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

function ccyFormat(num) {
  var nf = new Intl.NumberFormat();
  if (num < 0 ) {
  return `${nf.format(num.toFixed(2))}`;
  }
  return `${nf.format(num.toFixed(2))}`;
}

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

    API.comparequarter()
      .then(res => {
        let transactions = []
        res.data.forEach(element => {
          console.log(element)
          transactions.push({
            description: element._id.description,
            type: element._id.type,
            year: element._id.year,
            Q1: element.Q1,
            Q2: element.Q2,
            Q3: element.Q3,
            Q4: element.Q4,
          })
        })
        this.setState({ transactions: transactions })
      })
      .catch(err => console.log(err));
    API.compareqtrsum()
    .then(res => {
      let typesum = []
      res.data.forEach(element => {
        typesum.push({
          type: element._id.type,
          year: element._id.year,
          Q1: element.Q1,
          Q2: element.Q2,
          Q3: element.Q3,
          Q4: element.Q4,
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
            {(() => {
              switch(this.state.quarter) {
                case 1: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>REVENUE</b></TableCell>
                              <TableCell align="right"><b>Q4</b></TableCell>
                              <TableCell align="right"><b>Q1</b></TableCell>
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
                                  <TableCell align="right">{this.state.years - 1 === output.year ? ccyFormat(output.Q4) : 0}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.Q1)}</TableCell>
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
                                  <TableCell align="right"><b>{this.state.years - 1 === output.year ? ccyFormat(output.Q4) : 0}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.Q1)}</b></TableCell>
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
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>Q4</b></TableCell>
                              <TableCell align="right"><b>Q1</b></TableCell>
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
                                    <TableCell align="right">{this.state.years - 1 === output.year ? ccyFormat(output.Q4) : 0}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.Q1)}</TableCell>
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
                                    <TableCell align="right"><b>{this.state.years - 1 === output.year ? ccyFormat(output.Q4) : 0}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.Q1)}</b></TableCell>
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
                              <TableCell align="right"><b>Q1</b></TableCell>
                              <TableCell align="right"><b>Q2</b></TableCell>
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
                                  <TableCell align="right">{ccyFormat(output.Q1)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.Q2)}</TableCell>
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
                                  <TableCell align="right"><b>{ccyFormat(output.Q1)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.Q2)}</b></TableCell>
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
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>Q1</b></TableCell>
                              <TableCell align="right"><b>Q2</b></TableCell>
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
                                    <TableCell align="right">{ccyFormat(output.Q1)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.Q2)}</TableCell>
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
                                    <TableCell align="right"><b>{ccyFormat(output.Q1)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.Q2)}</b></TableCell>
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
                              <TableCell align="right"><b>Q2</b></TableCell>
                              <TableCell align="right"><b>Q3</b></TableCell>
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
                                  <TableCell align="right">{ccyFormat(output.Q2)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.Q3)}</TableCell>
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
                                  <TableCell align="right"><b>{ccyFormat(output.Q2)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.Q3)}</b></TableCell>
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
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>Q2</b></TableCell>
                              <TableCell align="right"><b>Q3</b></TableCell>
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
                                    <TableCell align="right">{ccyFormat(output.Q2)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.Q3)}</TableCell>
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
                                    <TableCell align="right"><b>{ccyFormat(output.Q2)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.Q3)}</b></TableCell>
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
                              <TableCell align="right"><b>Q3</b></TableCell>
                              <TableCell align="right"><b>Q4</b></TableCell>
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
                                  <TableCell align="right">{ccyFormat(output.Q3)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.Q4)}</TableCell>
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
                                  <TableCell align="right"><b>{ccyFormat(output.Q3)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.Q4)}</b></TableCell>
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
                            <TableRow className={classes.head}>
                              <TableCell><b>EXPENSES</b></TableCell>
                              <TableCell align="right"><b>Q3</b></TableCell>
                              <TableCell align="right"><b>Q4</b></TableCell>
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
                                    <TableCell align="right">{ccyFormat(output.Q3)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.Q4)}</TableCell>
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
                                    <TableCell align="right"><b>{ccyFormat(output.Q3)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.Q4)}</b></TableCell>
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

IncomeQuarter.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncomeQuarter);