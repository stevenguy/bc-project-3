import React from 'react';
import "./Footer.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 180;

const styles = theme => ({
    footer: {
      padding: "0px",
      textAlign: 'center',
      backgroundColor: 'rgb(245, 245, 245)',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      [theme.breakpoints.up('lg')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    },
    link: {
        textDecoration: "none",
        color: 'black'
    }
  });
  
  function Footer(props) {
    const { classes } = props;
  
    return (
      <div className={classes.footer}>
          <Typography variant="h6" color="inherit">
           <a className={classes.link} href="https://github.com/stevenguy/bc-project-3">
            <p>Github Repository</p>
           </a> 
          </Typography>
      </div>
    );
  }
  
  Footer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Footer);