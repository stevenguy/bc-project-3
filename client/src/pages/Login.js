import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import firebase, { auth, provider } from '../utils/firebase.js';
import Auth from "../utils/user";
import { Redirect } from "react-router";
import {Link} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
    //Style goes here
    login: {
        height: '100vh',
        width: '100%',
        background: "rgb(4,4,32)",
        background: "linear-gradient(42deg, rgba(4,4,32,1) 0%, rgba(26,26,69,1) 32%, rgba(191,76,95,1) 59%, rgba(186,17,17,1) 100%)"
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: "100%"
    },
    card: {
        height: "80%",
        [theme.breakpoints.down('sm')]: {
            height: '100%',
          },
    },
    brand: {
        backgroundColor: "rgb(229, 115, 106)",
        color: 'rgb(236, 236, 238)',
        display: 'flex',
        flexWrap: 'wrap',
        alignSelf: 'center',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        alignSelf: 'center',
        backgroundColor: "rgb(46, 50, 68)",
        color: 'rgb(109, 112, 123)'
    },
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        flexWrap: 'wrap',
        display: 'flex',
        width: '100%',
        color: 'white'
    },
    whiteText: {
        color: 'white',
    },
    cssLabel: {
        color: 'white !important',
        '&$cssFocused': {
            color: 'white',
        },
    },
    cssFocused: {
        color: 'white',
        borderColor: 'white',
    },
    cssUnderline: {
        '&:after': {
            borderBottomColor: 'white',
            color: 'white',
            borderColor: 'white',
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: 'white',
        },
    },
    notchedOutline: {
        borderColor: 'rgb(109, 112, 123) !important',
    },
    button: {
        color: 'white',
        margin: '10px'
    },
    googleIcon: {
        display: "inline-block",
        verticalAlign: "middle",
        margin: "8px 8px 8px 8px",
        width: "18px",
        height: "18px",
    },
    line: {
        width: '100%', 
        textAlign: 'center', 
        borderBottom: '1px solid white', 
        lineHeight: '0.1em',
        margin: '10px 0 20px'
     },
     lineText: { 
         color: 'white',
         padding: '0 10px',
         backgroundColor: "rgb(46, 50, 68)",
         fontFamily: "Roboto, Helvetica, Arial, sans-serif"
     },
    breakPoints: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
    },
    mobileLogo: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            width: '100%',
            justifyContent: 'center'
          },
    },
    chip: {
        margin: theme.spacing.unit,
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },

});

var local = localStorage.getItem('user');
const RegisterPage = props => <Link to="/register" {...props} />

class Login extends Component {

    state = {
        userName: '',
        password: '',
        showPassword: false,
        user: null,
        errorMsg: ''
    }

    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value,
        });
    };

    handleFormSubmit = event => {
        event.preventDefault()
        // this.setState({errorMsg: ''})
        if(this.state.userName != '' || this.state.password != '' || !this.state.userName.includes('@')){
            var credintials = {
                email: this.state.userName,
                password: this.state.password
            }
            Auth.authPassword(credintials)
            .then(res => {
                if(res.data != false){
                    localStorage.setItem('user', JSON.stringify(res.data));
                    local = JSON.parse(localStorage.getItem('user'));
                    window.location.reload();
                } else{
                    this.setState({errorMsg: "Invalid email or password"})
                }
            })
        }else{
            this.setState({errorMsg: "Invalid email or password"})
        }
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    logout() {
        auth.signOut()
            .then(() => {
                // this.setState(({user: null}))
                localStorage.removeItem('user');
                local = null;
                window.location.reload();
            });
    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                var temp = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    role: 'Preparer'
                };
                Auth.authUser(temp)
                    .then(res => {
                        localStorage.setItem('user', JSON.stringify(res.data));
                        local = JSON.parse(localStorage.getItem('user'));
                            window.location.reload();
                    })
            });
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.state.user = user
            }
        });
    }


    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid
                    container
                    className={classes.login}
                    justify="center"
                    alignItems='center'
                >
                    <Grid item className={classes.card + " " + classes.breakPoints} md={4}>
                        <Paper square={true} className={classes.root + " " + classes.brand} elevation={10}>
                            <div style={{ justifyContent: 'center'}} className={classes.flex}>
                                <div style={{display: 'flex', alignSelf: 'flex-start', maxHeight: '250px', marginTop: '-150px'}}>
                                    <img src="../images/acctg_blue.png" alt="acctg" style={ {display: 'block', height: 'auto', maxWidth: '100%'}}/>
                                </div>
                                <Typography style={{marginTop: '-50px'}} color='inherit' variant='h3' component="h3">
                                    Web Accounting
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.card} md={4}>
                        <Paper square={true} className={classes.root + " " + classes.form} elevation={10}>
                            <div className={classes.flex}>
                                {local ?
                                    <Redirect to='/dashboard' />
                                    :
                                    <React.Fragment>
                                        <div className={classes.mobileLogo}>
                                            <img src="../images/acctg_blue.png" alt="acctg" style={ {margin: '0 auto', height: 100, width: 200}}/>
                                        </div>
                                        <div className={classes.mobileLogo}>
                                            <Typography color='inherit' variant='h6' component="h6">
                                                Web Accounting
                                            </Typography>
                                        </div>
                                        <Typography style={ {marginTop: '30px'}}className={classes.textField} color='inherit' variant="h5" component="h5">SIGN IN</Typography>
                                        <Button onClick={this.login} variant="outlined" className={classes.button}>
                                            <span className={classes.googleIcon}>
                                                <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335" /><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05" /><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4" /><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853" /></svg>
                                            </span>
                                            <span>Sign In</span>
                                        </Button>
                                        <p className={classes.line}><span className={classes.lineText}>OR</span></p>
                                        <form className={classes.container}>
                                            <TextField
                                                id="Username-input"
                                                label="Email"
                                                className={classes.textField}
                                                type="Username"
                                                name="username"
                                                margin="normal"
                                                variant="outlined"
                                                value={this.state.userName}
                                                onChange={this.handleChange('userName')}
                                                InputLabelProps={{
                                                    classes: {
                                                        root: classes.cssLabel,
                                                        focused: classes.cssFocused,
                                                    },
                                                }}
                                                InputProps={{
                                                    classes: {
                                                        input: classes.whiteText,
                                                        root: classes.cssOutlinedInput,
                                                        focused: classes.cssFocused,
                                                        notchedOutline: classes.notchedOutline,
                                                    }
                                                }}
                                            />
                                            <TextField
                                                id="outlined-adornment-password"
                                                className={classes.textField}
                                                variant="outlined"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                label="Password"
                                                value={this.state.password}
                                                onChange={this.handleChange('password')}
                                                InputLabelProps={{
                                                    classes: {
                                                        root: classes.cssLabel,
                                                        focused: classes.cssFocused,
                                                    },
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="Toggle password visibility"
                                                                onClick={this.handleClickShowPassword}
                                                                className={classes.whiteText}
                                                            >
                                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    classes: {
                                                        input: classes.whiteText,
                                                        root: classes.cssOutlinedInput,
                                                        focused: classes.cssFocused,
                                                        notchedOutline: classes.notchedOutline,
                                                    },
                                                }}
                                            />
                                            {this.state.errorMsg 
                                            ? <Chip
                                            icon={<ErrorIcon />}
                                            label={this.state.errorMsg}
                                            className={classes.chip}
                                            color="secondary"
                                            />: null}
                                            <Button type='submit' onClick={this.handleFormSubmit} variant="outlined" className={classes.button}>
                                            Sign In
                                            </Button>
                                            <Button component={RegisterPage} variant="outlined" className={classes.button}>
                                            Register
                                            </Button>

                                        </form>
                                    </React.Fragment>
                                }
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
