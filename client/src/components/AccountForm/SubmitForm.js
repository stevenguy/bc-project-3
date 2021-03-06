import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Media from "react-media";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListRow from './ListRow'
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  //Style goes here
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250,
    padding: "0 10px"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
    alignSelf: 'center'
  }
});

class SubmitForm extends Component {
    state = {
      //State goes here
        labelWidth: 0,
        open: false,
    }

    render() {
      const { classes } = this.props;

      return (
        <React.Fragment>
          <Media query="(max-width: 1024px)">
          {matches =>
            matches ? (
              <List className={classes.root}>
                {this.props.entries.map((entry, index) => (
                  <React.Fragment key={index}>
                    <ListRow entry={entry} index={index} />
                    <Divider />
                  </React.Fragment>
                    )
                )}
              </List>
            ) : (
            <Paper>
              <Table className={classes.table}>
                  <TableHead>
                  <TableRow>
                      <TableCell align='justify'>Account Name</TableCell>
                      <TableCell align="justify">Account Number</TableCell>
                      <TableCell align="justify">Account Type</TableCell>
                      <TableCell align="justify">Date</TableCell>
                      <TableCell align="justify">Transaction</TableCell>
                      <TableCell align="justify">Memo</TableCell>
                      <TableCell align="justify">Details</TableCell>
                      <TableCell align="justify">Amount</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.props.entries.map((entry, index) => (
                      <TableRow key={index}> 
                          <TableCell align='justify'>{entry.account.name}</TableCell>
                          <TableCell align="justify">{entry.account.number}</TableCell>
                          <TableCell align="justify">{entry.account.type}</TableCell>
                          <TableCell align="justify">{entry.date.toLocaleDateString('en-US')}</TableCell>
                          <TableCell align="justify">{entry.description}</TableCell>
                          <TableCell align="justify">{entry.memo}</TableCell>
                          <TableCell align="justify">{entry.details}</TableCell>
                          <TableCell align="justify">{'$ ' + parseFloat(entry.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                      </TableRow>
                      )
                  )}
                  </TableBody>
              </Table>
            </Paper>
            )
          }
        </Media>
        </React.Fragment>
          );
        }
      }
SubmitForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubmitForm);