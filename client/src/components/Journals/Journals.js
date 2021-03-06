import React, { Component } from "react"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import API from '../../utils/API'
import Media from "react-media"
import List from '@material-ui/core/List';
import JournalRow from "../JournalRow/JournalRow";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
  },
  table: {
    minWidth: 700,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
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

const user = JSON.parse(localStorage.getItem('user'))

class Journals extends Component {
  state = {
    journals: 'Select',
    journalData: [],
    hideApprove: false,
    hideUnapprove: false,
    disableApprove: false,
    disableUnapprove: false,
  }

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    })
  }

  handleApprove = journal => {
    this.setState({ hideUnapprove: true })
    API.approveJournal({ journalId: journal, user: user.name })
      .then(() => {
        this.setState({ disableApprove: true })
        API.notification(user.name + " Approved A Journal!")
      }) 
  }

  handleUnapprove = journal => {
    this.setState({ hideApprove: true })
    API.unapproveJournal({ journalId: journal, user: user.name })
      .then(() => {
        this.setState({ disableUnapprove: true })
        API.notification(user.name + " Unapproved A Journal!")
      })
  }

  render() {
    const { classes } = this.props
    const hideApprove = this.state.hideApprove ? { display: 'none' } : {}
    const hideUnapprove = this.state.hideUnapprove ? { display: 'none' } : {}

    return (
      <React.Fragment>
        <Media query="(max-width: 1024px)">
          {matches =>
            matches ? (
              <List>
                {this.props.output.transaction.map((entry, index) => (
                  <React.Fragment key={index}>
                    <JournalRow entry={entry} index={index} />
                   {index === this.props.output.transaction.length - 1 ? '' : <Divider />} 
                  </React.Fragment>
                )
                )}
                {
                  this.props.output.transaction[0].status === 'Pending' && !this.state.disableApprove && !this.state.disableUnapprove && user.role.toLowerCase() === 'manager'
                    ? <Button style={hideUnapprove} onClick={() => {
                      this.handleApprove(this.props.output._id)
                    }}
                      variant="contained" className={classes.button}>
                      Approve
                </Button>
                    : this.props.output.transaction[0].status === 'Pending' && this.state.disableApprove && !this.state.disableUnapprove && user.role.toLowerCase() === 'manager'
                      ? <Button disabled variant="contained" className={classes.button}>
                        Approved!
                </Button>
                      : ''
                }
                {
                  this.props.output.transaction[0].status === 'Pending' && !this.state.disableUnapprove && !this.state.disableApprove && user.role.toLowerCase() === 'manager'
                    ? <Button color='secondary' style={hideApprove} onClick={() => {
                      this.handleUnapprove(this.props.output._id)
                    }}
                      variant="contained" className={classes.button}>
                      Unapprove
                </Button>
                    : this.props.output.transaction[0].status === 'Pending' && this.state.disableUnapprove && !this.state.disableApprove && user.role.toLowerCase() === 'manager'
                      ? <Button disabled variant="contained" className={classes.button}>
                        Unapproved!
                </Button>
                      : ''
                }
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
                          <TableCell align='left'><b>Status:</b> {transactions.status}</TableCell>
                          <TableCell align='right'><b>Date:</b> {transactions.date.toLocaleDateString('en-US')}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='left'><b>Account:</b> {transactions.account}</TableCell>
                          <TableCell align='right'><b>Description:</b> {transactions.description}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='left'><b>Amount: $</b> {transactions.amount}</TableCell>
                          <TableCell align='right'><b>Type:</b> {transactions.type}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='left'><b>Memo:</b> {transactions.memo}</TableCell>
                          <TableCell align='right'><b>Detail:</b> {transactions.details}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='left'><b>Preparer:</b> {transactions.preparer}</TableCell>
                          <TableCell align='right'><b>Prepared Date:</b> {transactions.prepared_date.toLocaleDateString('en-US')}</TableCell>
                          </TableRow>
                        <TableRow>
                          <TableCell align='left'><b>Approver:</b> {transactions.approver}</TableCell>
                          <TableCell align='right'><b>{transactions.status === 'Unapproved' ? 'Unapproved Date:' : 'Approved Date:' } </b> {transactions.status === 'Pending' ? '' : transactions.approved_date.toLocaleDateString('en-US')}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>    
                ))
              }
              {
                this.props.output.transaction[0].status === 'Pending' && !this.state.disableApprove && !this.state.disableUnapprove && user.role.toLowerCase() === 'manager'
              ? <Button style={hideUnapprove} onClick={() => {
                this.handleApprove(this.props.output._id)
              }} 
                variant="contained" className={classes.button}>
                Approve
                </Button>
                      : this.props.output.transaction[0].status === 'Pending' && this.state.disableApprove && !this.state.disableUnapprove && user.role.toLowerCase() === 'manager'
              ? <Button disabled variant="contained" className={classes.button}>
                Approved!
                </Button>
              : ''
              }
              {
                this.props.output.transaction[0].status === 'Pending' && !this.state.disableUnapprove && !this.state.disableApprove && user.role.toLowerCase() === 'manager'
              ? <Button style={hideApprove} onClick={() => {
                this.handleUnapprove(this.props.output._id)
              }} 
              color='secondary' variant="contained" className={classes.button}>
                Unapprove
                </Button>
                      : this.props.output.transaction[0].status === 'Pending' && this.state.disableUnapprove && !this.state.disableApprove && user.role.toLowerCase() === 'manager'
              ? <Button disabled variant="contained" className={classes.button}>
                Unapproved!
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