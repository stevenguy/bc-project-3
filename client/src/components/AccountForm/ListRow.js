import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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

class ListRow extends Component {
    state = {
      //State goes here
        labelWidth: 0,
        open: false,
    }

    handleClick = () => {
      this.setState(state => ({ open: !state.open }));
    };

    render() {
      const { classes } = this.props;

      return (
            <Paper>
                <ListItem button onClick={this.handleClick} key={this.props.index} alignItems="flex-start">
                    <ListItemAvatar>
                    {this.props.entry.details === "Debit" 
                    ? <Avatar style={{ backgroundColor: 'green' }}>DR</Avatar>
                    : <Avatar style={{ backgroundColor: 'red' }}>CR</Avatar>}
                    </ListItemAvatar>
                    <ListItemText
                    primary={"Amount: $ " + parseFloat(this.props.entry.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    secondary={
                        <React.Fragment>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                        {"Description: " + this.props.entry.description}
                        </Typography>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                        {this.state.open ? "Memo: " + this.props.entry.memo : null}
                        </Typography>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                        {'Account: ' + this.props.entry.account.name}
                        </Typography>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                        {this.state.open ? 'Account Number: ' + this.props.entry.account.number : null}
                        </Typography>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                        {this.state.open ? 'Account Type: ' + this.props.entry.account.type : null}
                        </Typography>
                        {this.props.entry.date.toLocaleDateString('en-US')}
                        </React.Fragment>
                    }
                    />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
            </Paper>
        )
      }
    }
        
      
ListRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListRow);