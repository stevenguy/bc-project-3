import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import StatusIcon from '@material-ui/icons/ThumbsUpDown';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NavLink } from 'react-router-dom'
import { Route } from "react-router-dom";
import firebase, { auth, provider } from '../../utils/firebase.js';
import { Redirect } from "react-router";





const drawerWidth = 180;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: '#000000b0',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  user: {
    margin: 0,
    padding: 0,
    width: "100%"
  },
  brand: {
    margin: "0",
    textAlign: 'center'
  }
});

var local = localStorage.getItem('user')
let user = JSON.parse(local)

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    menuArr: ['Dashboard', 'Entries', 'Upload', 'Status', 'Search', 'Reports']
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  logout = () => {
    auth.signOut()
        .then(() => {
            // this.setState(({user: null}))
            localStorage.removeItem('user');
            local = null;
            window.location.href = '/';
        });
}

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
        <p className={classes.brand}><img src="../../images/acctg_blue.png" alt="acctg" style={ { height: 50, width: 100}}/></p>
        </div>
        <ExpansionPanel className={classes.user}>
        <ExpansionPanelSummary className={classes.user} expandIcon={<ExpandMoreIcon />}>
          <Avatar alt="Login User" src={user.photoURL} className={classes.avatar} />
          <Typography>{user.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.user}>
        <List className={classes.user}>
            <ListItem button>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItem>
            <ListItem button onClick={this.logout}>
              <ListItemIcon><PowerSettingsNewIcon/></ListItemIcon>
              <ListItemText primary='Log Out' />
            </ListItem>
        </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        <Divider />
        <List>
        {this.state.menuArr.map(text => (
             <NavLink exact={true} style={{ textDecoration: 'none' }} key={text} to={text}>
             <ListItem
              button>
               <ListItemIcon>{text === "Dashboard" 
               ? <DashboardIcon /> 
               : text === "Entries"
               ? <CreateIcon />
               : text === "Upload"
               ? <CloudUploadIcon />
               : text === "Status"
               ? <StatusIcon />
               : text === "Search"
               ? <SearchIcon />
               : text === "Reports"
               ? <BarChartIcon />
               : ""
              }</ListItemIcon>
               <ListItemText primary={text} />
             </ListItem>
             </NavLink>
          ))}
        </List>
        <Divider />
      </div>
    );

    return (
      <React.Fragment>
        {local ? '': <Redirect to='/'/>}
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
            {this.state.menuArr.map(text => (
              <Route key={text} path={'/' + text} exact render={() => <div>{text}</div>}/>
            ))}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden mdUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
    </React.Fragment>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);