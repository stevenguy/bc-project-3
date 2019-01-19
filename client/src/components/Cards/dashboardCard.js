import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import Divider from '@material-ui/core/Divider';


const styles = {
  card: {
    maxWidth: 500,
    height: 300,
    paddingBottom: 325,
  },
  media: {
    height: 140,
  },
  spacing: {
    textAlign: 'center'
  },
  titleSizing: {
    height: '75px'
  },
  p: {
    marginTop: '10px'
  }
};

function DashboardCard(props) {
  const { classes, title, icon, path, text, color } = props;
  return (
    <Card className={classes.card} >
      <Link to={'/' + path} style={{color: 'black', textDecoration: 'none'}}>
      <CardActionArea style={{color: props.color, height: 400}}>
        <div style={styles.spacing}>{icon}</div>
        <CardContent style={{paddingBottom: 500}}>
          <div style={styles.titleSizing}>
            <Typography gutterBottom variant="h5" component="h2" align="center">{title}</Typography>
          </div>
          <Divider/>
          <Typography variant='subheading' className={classes.p}>
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  );
}

DashboardCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardCard);