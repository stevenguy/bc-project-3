import React, { Component } from "react"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import grey from '@material-ui/core/colors/grey'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import API from '../../utils/API'
import Media from "react-media"
import List from '@material-ui/core/List';
import JournalRow from "../JournalRow/JournalRow";

const drawerWidth = 180

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 700,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
  },
  card: {
    minWidth: 275,
  },
})

const journals = [
  {
    value: 1,
    label: 'Approved'
  },
  {
    value: 2,
    label: 'Unapproved'
  },
  {
    value: 3,
    label: 'Pending'
  }
]

class Journals extends Component {
  state = {
    journals: 'Select',
    journalData: [],
    disable: false
  }

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    })
  }

  handleApprove = journal => {
    API.approveJournal({ journalId: journal })
      .then(() => {
        this.setState({ disable: true })
      }) 
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Media query="(max-width: 1024px)">
          {matches =>
            matches ? (
              <List>
                {this.props.output.transaction.map((entry, index) => (
                  <React.Fragment key={index}>
                    <JournalRow entry={entry} index={index} />
                    <Divider />
                  </React.Fragment>
                )
                )}
              </List>
            ) : (
              <React.Fragment>
              {
                this.props.output.transaction.map((transactions, i) => (
                  <CardContent>
                    <Typography className={classes.heading}>{transactions.transaction}</Typography>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell><b>Date:</b> {transactions.date.toLocaleDateString('en-US')}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Account:</b> {transactions.account}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Description:</b> {transactions.description}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Type:</b> {transactions.type}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Memo:</b> {transactions.memo}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Detail:</b> {transactions.details}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Preparer:</b> {transactions.preparer}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Prepared Date:</b> {transactions.prepared_date.toLocaleDateString('en-US')}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Approver:</b> {transactions.approver}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Approved Date:</b> {transactions.approved_date}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><b>Status:</b> {transactions.status}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                ))
              }
              {
                this.props.output.transaction[0].status === 'Pending' && !this.state.disable 
              ? <Button onClick={() => {
                this.handleApprove(this.props.output._id)
              }} 
              variant="contained" className={classes.button}>
                Approve
                </Button>
              : this.props.output.transaction[0].status === 'Pending' && this.state.disable 
              ? <Button disabled variant="contained" className={classes.button}>
                Approved!
                </Button>
              : ''
              }
              </React.Fragment>
            ) 
          }
        </Media>  
      </React.Fragment>
    )
  }
}

Journals.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Journals)