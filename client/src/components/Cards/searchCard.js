import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import API from '../../utils/API'
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  card: {
    flex: 1,
    // marginBottom: '0px',
    // marginTop: '20px',
    margin: '15px',
    maxWidth: '820px',
    left: 0
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  margins: {
    marginLeft: '20px'
  },
  content: {
    marginLeft: '20px',
  }
});

const user = JSON.parse(localStorage.getItem('user'))

class SimpleCard extends React.Component {
  state = { 
    expanded: false, 
    journals: 'Select',
    journalData: [],
    hideApprove: false,
    hideUnapprove: false,
    disableApprove: false,
    disableUnapprove: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleApprove = journal => {
    this.setState({ hideUnapprove: true })
    API.approveJournal({ journalId: journal })
      .then(() => {
        this.setState({ disableApprove: true })
        API.notification(user.name + " Approved A Journal!")
      }) 
  }

  handleUnapprove = journal => {
    this.setState({ hideApprove: true })
    API.unapproveJournal({ journalId: journal })
      .then(() => {
        this.setState({ disableUnapprove: true })
      })
  }

  render() {
    const { classes } = this.props;
    const hideApprove = this.state.hideApprove ? { display: 'none' } : {}
    const hideUnapprove = this.state.hideUnapprove ? { display: 'none' } : {}

    return (
      <Card className={classes.card} raised={true}>
        <CardHeader
          className={classes.margins}
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {this.props.cat == 30 ? <BookmarkBorderIcon/> : <AccountCircleIcon/>}
            </Avatar>
          }
          title={
              <Typography 
                className={classes.card} 
                paragraph variant= 'h4'>{
                  this.props.cat == 30 ? this.props.info.journal_id : 
                  this.props.cat == 20 ? this.props.info.preparer:
                  this.props.cat == 10 ? this.props.info.approver: 
                  'None Selected'
                  }
              </Typography>
          }
          subheader={`Date Logged: ${this.props.info.date.toLocaleDateString('en-US')}`}
        />
          <Divider variant='middle'/>
          <CardContent className={classes.content}>
            <Grid container spacing= {32}>
              <Grid item>
                <Typography paragraph>
                <b>Journal ID: </b> {this.props.info.journal_id}<br></br>
                <b>Date: </b> {this.props.info.date.toLocaleDateString('en-US')}<br></br>
                <b>Description: </b> {this.props.info.preparer}<br></br>
                <b>Account: </b> {this.props.info.account}<br></br>
                <b>Memo: </b> {this.props.info.memo}<br></br>
                <b>Details: </b> {this.props.info.details}<br></br>
                <b>Amount: </b> {this.props.info.amount}<br></br>
                </Typography>
              </Grid>
              <Grid item>
                <Typography paragraph>
                <b>Type of Transaction: </b> {this.props.info.transaction}<br></br>
                <b>Status: </b> {this.props.info.status}<br></br>
                <b>Preparer's Name: </b> {this.props.info.preparer}<br></br>
                <b>Prepared Date: </b> {this.props.info.prepared_date.toLocaleDateString('en-US')}<br></br>
                <b>Approver's Name: </b> {this.props.info.approver}<br></br>
                <b>Approved/Unapproved Date: </b> {this.props.info.approved_date.toLocaleDateString('en-US')}<br></br>
                </Typography>
              </Grid>
              {/* newcode~~~~~~~~~~~~~``` */}
              {
                this.props.info.status === 'Pending' && !this.state.disableApprove && !this.state.disableUnapprove
              ? <Button style={hideUnapprove} onClick={() => {
                this.handleApprove(this.props._id)
              }} 
              variant="contained" className={classes.button}>
                Approve
                </Button>
                      : this.props.info.status === 'Pending' && this.state.disableApprove && !this.state.disableUnapprove
              ? <Button disabled variant="contained" className={classes.button}>
                Approved!
                </Button>
              : ''
              }
              {
                this.props.info.status === 'Pending' && !this.state.disableUnapprove && !this.state.disableApprove
              ? <Button style={hideApprove} onClick={() => {
                this.handleUnapprove(this.props._id)
              }} 
              variant="contained" className={classes.button}>
                Unapprove
                </Button>
                      : this.props.info.status === 'Pending' && this.state.disableUnapprove && !this.state.disableApprove
              ? <Button disabled variant="contained" className={classes.button}>
                Unapproved!
                </Button>
              : ''
              }
              {/* newcode~~~~~~~~~~~~~~~`` */}
            </Grid>
            {/* <Typography paragraph > Journal ID: {this.props.info.transaction} </Typography> */}
          </CardContent>
        {/* </Collapse> */}
      </Card>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);