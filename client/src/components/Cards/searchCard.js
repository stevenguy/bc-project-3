import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    flex: 1,
    marginBottom: '0px',
    marginTop: '20px',
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
});

class SimpleCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={
              <Typography className={classes.card} paragraph variant= 'h4'>{this.props.info.preparer}</Typography>
          }
          subheader="September 14, 2016"
        />
        {/* <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions> */}
        {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit> */}
          <CardContent>
            <Grid container spacing= {32}>
              <Grid item>
                <Typography paragraph>
                Journal ID: {this.props.info.journal_id}<br></br>
                Date: {this.props.info.date}<br></br>
                Description: {this.props.info.preparer}<br></br>
                Account: {this.props.info.account}<br></br>
                Memo: {this.props.info.memo}<br></br>
                Details: {this.props.info.details}<br></br>
                Amount: {this.props.info.amount}<br></br>
                </Typography>
              </Grid>
              <Grid item>
                <Typography paragraph>
                Type of Transaction: {this.props.info.transaction}<br></br>
                Status: {this.props.info.status}<br></br>
                Preparer's Name: {this.props.info.preparer}<br></br>
                Prepared Date: {this.props.info.prepared_date}<br></br>
                Approver's Name: {this.props.info.approver}<br></br>
                Approved/Unapproved Date: {this.props.info.approved_date}<br></br>
                </Typography>
              </Grid>
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