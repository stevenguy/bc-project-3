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

function ccyFormat(num) {
  var nf = new Intl.NumberFormat();
  if (num < 0 ) {
  return `${nf.format(num.toFixed(2))}`;
  }
  return `${nf.format(num.toFixed(2))}`;
}

class BalanceYear extends Component {

  state = {
    year: [],
    transactions: [],
    typesum: [],
    years: 0,
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

    API.compareyear()
      .then(res => {
        let transactions = []
        res.data.forEach(element => {
          console.log(element)
          transactions.push({
            description: element._id.description,
            type: element._id.type,
            year: element._id.year,
            yearOne: element.yearOne,
            yearTwo: element.yearTwo,
            yearThree: element.yearThree,
            yearFour: element.yearFour,
            yearFive: element.yearFive,
          })
        })
        this.setState({ transactions: transactions })
      })
      .catch(err => console.log(err));
      
    
    API.compareyrsum()
    .then(res => {
      let typesum = []
      res.data.forEach(element => {
        typesum.push({
          type: element._id.type,
          year: element._id.year,
          yearOne: element.yearOne,
          yearTwo: element.yearTwo,
          yearThree: element.yearThree,
          yearFour: element.yearFour,
          yearFive: element.yearFive,
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
        </form>
        <Button onClick={this.handleRun} variant="contained" color="grey" className={classes.button}>
          Run
        </Button>
      </Paper>

      <div style={ { height: 10 } }></div>

      <React.Fragment>
        <Table>
            {(() => {
              switch(this.state.years) {
                case 2017: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>ASSET</b></TableCell>
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions.map((output, i) => {
                            if (output.type === 'Assets'
                            ) {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{this.state.years - 1 === output.yearOne ? ccyFormat(output.yearOne) : 0}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.yearOne)}</TableCell>
                                </TableRow>
                              );
                            }
                          })}
                          {this.state.typesum.map((output, i) => {
                            if (output.type === 'Assets'
                            ) {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{this.state.years - 1 === output.yearOne ? ccyFormat(output.yearOne) : 0}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.yearOne)}</b></TableCell>
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
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions.map((output, i) => {
                              if (output.type === 'Liability'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{this.state.years - 1 === output.yearOne ? ccyFormat(output.yearOne) : 0}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearOne)}</TableCell>
                                  </TableRow>
                                );
                                }
                            })}
                            {this.state.typesum.map((output, i) => {
                              if (output.type === 'Liability'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{this.state.years - 1 === output.yearOne ? ccyFormat(output.yearOne) : 0}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearOne)}</b></TableCell>
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
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions.map((output, i) => {
                              if (output.type === 'Retained Earnings'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{this.state.years - 1 === output.yearOne ? ccyFormat(output.yearOne) : 0}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearOne)}</TableCell>
                                  </TableRow>
                                );  
                                }
                            })}
                            {this.state.typesum.map((output, i) => {
                              if (output.type === 'Retained Earnings'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{this.state.years - 1 === output.yearOne ? ccyFormat(output.yearOne) : 0}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearOne)}</b></TableCell>
                                  </TableRow>
                                );  
                                }
                            })}
                          </TableBody>
                        </Table>
                      </Paper>
                    </React.Fragment>
                  );
                case 2018: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>ASSET</b></TableCell>
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions.map((output, i) => {
                            if (output.type === 'Assets'
                            ) {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.yearOne)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.yearTwo)}</TableCell>
                                </TableRow>
                              );
                            }
                          })}
                          {this.state.typesum.map((output, i) => {
                            if (output.type === 'Assets'
                            ) {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.yearOne)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.yearTwo)}</b></TableCell>
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
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions.map((output, i) => {
                              if (output.type === 'Liability'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearOne)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearTwo)}</TableCell>
                                  </TableRow>
                                );
                                }
                            })}
                            {this.state.typesum.map((output, i) => {
                              if (output.type === 'Liability'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearOne)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearTwo)}</b></TableCell>
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
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions.map((output, i) => {
                              if (output.type === 'Retained Earnings'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearOne)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearTwo)}</TableCell>
                                  </TableRow>
                                );  
                                }
                            })}
                            {this.state.typesum.map((output, i) => {
                              if (output.type === 'Retained Earnings'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearOne)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearTwo)}</b></TableCell>
                                  </TableRow>
                                );  
                                }
                            })}
                          </TableBody>
                        </Table>
                      </Paper>
                    </React.Fragment>
                  );
                case 2019: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>ASSET</b></TableCell>
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions.map((output, i) => {
                            if (output.type === 'Assets'
                            ) {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.yearTwo)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.yearThree)}</TableCell>
                                </TableRow>
                              );
                            }
                          })}
                          {this.state.typesum.map((output, i) => {
                            if (output.type === 'Assets'
                            ) {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.yearTwo)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.yearThree)}</b></TableCell>
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
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions.map((output, i) => {
                              if (output.type === 'Liability'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearTwo)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearThree)}</TableCell>
                                  </TableRow>
                                );
                                }
                            })}
                            {this.state.typesum.map((output, i) => {
                              if (output.type === 'Liability'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearTwo)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearThree)}</b></TableCell>
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
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions.map((output, i) => {
                              if (output.type === 'Retained Earnings'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearTwo)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearThree)}</TableCell>
                                  </TableRow>
                                );  
                                }
                            })}
                            {this.state.typesum.map((output, i) => {
                              if (output.type === 'Retained Earnings'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearTwo)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearThree)}</b></TableCell>
                                  </TableRow>
                                );  
                                }
                            })}
                          </TableBody>
                        </Table>
                      </Paper>
                    </React.Fragment>
                  );
                case 2020: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>ASSET</b></TableCell>
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions.map((output, i) => {
                            if (output.type === 'Assets'
                            ) {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.yearThree)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.yearFour)}</TableCell>
                                </TableRow>
                              );
                            }
                          })}
                          {this.state.typesum.map((output, i) => {
                            if (output.type === 'Assets'
                            ) {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.yearThree)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.yearFour)}</b></TableCell>
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
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions.map((output, i) => {
                              if (output.type === 'Liability'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearThree)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearFour)}</TableCell>
                                  </TableRow>
                                );
                                }
                            })}
                            {this.state.typesum.map((output, i) => {
                              if (output.type === 'Liability'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearThree)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearFour)}</b></TableCell>
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
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions.map((output, i) => {
                              if (output.type === 'Retained Earnings'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearThree)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearFour)}</TableCell>
                                  </TableRow>
                                );  
                                }
                            })}
                            {this.state.typesum.map((output, i) => {
                              if (output.type === 'Retained Earnings'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearThree)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearFour)}</b></TableCell>
                                  </TableRow>
                                );  
                                }
                            })}
                          </TableBody>
                        </Table>
                      </Paper>
                    </React.Fragment>
                  );
                  case 2021: 
                  return (
                    <React.Fragment>
                      <Paper>
                        <Table>
                          <TableHead>
                            <TableRow className={classes.head}>
                              <TableCell><b>ASSET</b></TableCell>
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                          {this.state.transactions.map((output, i) => {
                            if (output.type === 'Assets'
                            ) {
                              return (
                                <TableRow key={i}>
                                  <TableCell>{output.description}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.yearFour)}</TableCell>
                                  <TableCell align="right">{ccyFormat(output.yearFive)}</TableCell>
                                </TableRow>
                              );
                            }
                          })}
                          {this.state.typesum.map((output, i) => {
                            if (output.type === 'Assets'
                            ) {
                              return (
                                <TableRow key={i}>
                                  <TableCell><b>TOTAL</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.yearFour)}</b></TableCell>
                                  <TableCell align="right"><b>{ccyFormat(output.yearFive)}</b></TableCell>
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
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions.map((output, i) => {
                              if (output.type === 'Liability'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearFour)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearFive)}</TableCell>
                                  </TableRow>
                                );
                                }
                            })}
                            {this.state.typesum.map((output, i) => {
                              if (output.type === 'Liability'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearFour)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearFive)}</b></TableCell>
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
                              <TableCell align="right"><b>{this.state.years - 1}</b></TableCell>
                              <TableCell align="right"><b>{this.state.years}</b></TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <Table>
                          <TableBody>
                            {this.state.transactions.map((output, i) => {
                              if (output.type === 'Retained Earnings'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{output.description}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearFour)}</TableCell>
                                    <TableCell align="right">{ccyFormat(output.yearFive)}</TableCell>
                                  </TableRow>
                                );  
                                }
                            })}
                            {this.state.typesum.map((output, i) => {
                              if (output.type === 'Retained Earnings'
                              ) {
                                return (
                                  <TableRow key={i}>
                                    <TableCell><b>TOTAL</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearFour)}</b></TableCell>
                                    <TableCell align="right"><b>{ccyFormat(output.yearFive)}</b></TableCell>
                                  </TableRow>
                                );  
                                }
                            })}
                          </TableBody>
                        </Table>
                      </Paper>
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

BalanceYear.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BalanceYear);