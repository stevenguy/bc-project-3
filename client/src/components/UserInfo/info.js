import React, { Component } from "react";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    card: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      height: '150px'
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
    }
  });
  

class Userinfo extends Component {


    render() {
        const {classes} = this.props;

        return (
            <Grid key={this.props._id} item lg={3} md={4} sm={6} xs={12}>
                <Card className={classes.card}>
                    <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                        {this.props.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                        {this.props.email}
                        </Typography>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Role</InputLabel>
                            <Select
                                value={this.props.role}
                                onChange={(event) => this.props.clicked(this.props._id, event.target.value)}
                                inputProps={{
                                name: 'Role',
                                id: 'role',
                                }}
                            >
                                <MenuItem value='Manager'>Manager</MenuItem>
                                <MenuItem value='Preparer'>Preparer</MenuItem>
                            </Select>
                        </FormControl>
                    </CardContent>

                    </div>
                    <CardMedia
                    className={classes.cover}
                    image={this.props.photoURL ? this.props.photoURL : '../../images/avatar.jpg'}
                    title={this.props.name}
                    />
                </Card>
            </Grid>
        )
    }
}

Userinfo.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Userinfo);